import React, { useMemo } from 'react';

// third-party
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { PrimeIcons } from 'primereact/api';
import { Card } from 'primereact/card';
import _ from 'lodash';

// application
import { getAuthorized } from '../../libs/auth';
import GenericViewGenerator from '../../components/global/GenericViewGenerator';
import { getGeneralStatusOptions } from '../../utils';
import { UrlBasedColumnItem } from '../../components';

export const getServerSideProps: GetServerSideProps = async context => getAuthorized(context, 'Job Management');

const Page = () => {
    const router = useRouter();

    return (
        <Card>
            {useMemo(
                () => (
                    <GenericViewGenerator
                        name={'job'}
                        title="Job"
                        subtitle="Manage job here!"
                        viewAll={{
                            uri: `/api/v1/job`,
                            ignoredColumns: ['id', 'createdAt', 'updatedAt'],
                            actionIdentifier: 'id',
                            onDataModify: data =>
                                _.map(data, datum => ({
                                    ...datum,
                                })),
                        }}
                        addNew={{
                            uri: `/api/v1/job`,
                        }}
                        viewOne={{ uri: '/api/v1/job/{id}', identifier: '{id}' }}
                        editExisting={{ uri: '/api/v1/job/{id}', identifier: '{id}' }}
                        removeOne={{
                            uri: '/api/v1/job/{id}',
                            identifier: '{id}',
                        }}
                        fields={[
                            {
                                type: 'text',
                                name: 'position',
                                placeholder: 'Enter a position!',
                                title: 'Position',
                                initialValue: null,
                                validate: (values: any) => {
                                    if (!values.position) return 'Required!';

                                    return null;
                                },
                            },
                            {
                                type: 'text',
                                name: 'department',
                                placeholder: 'Enter a department!',
                                title: 'Department',
                                initialValue: null,
                                validate: (values: any) => {
                                    if (!values.department) return 'Required!';

                                    return null;
                                },
                            },
                            {
                                type: 'text',
                                name: 'jobType',
                                placeholder: 'Enter a jobType!',
                                title: 'Job Type',
                                initialValue: null,
                                validate: (values: any) => {
                                    if (!values.jobType) return 'Required!';

                                    return null;
                                },
                            },
                            {
                                type: 'date',
                                name: 'deadLine',
                                placeholder: 'Select deadLine!',
                                title: 'Dead Line',
                                initialValue: null,
                                validate: (values: any) => {
                                    if (!values.deadLine) return 'Required!';

                                    return null;
                                },
                            },
                            {
                                type: 'richtext',
                                name: 'jobDescription',
                                placeholder: 'Enter a  job description!',
                                title: 'Job Description',
                                initialValue: null,
                                validate: (values: any) => {
                                    if (!values.jobDescription) return 'Required!';

                                    return null;
                                },
                            },
                            {
                                type: 'number',
                                name: 'serial',
                                placeholder: 'Enter a serial!',
                                title: 'Serial',
                                initialValue: null,
                            },
                            {
                                type: 'select-sync',
                                name: 'status',
                                placeholder: 'Select a status!',
                                title: 'Status',
                                initialValue: 'ACTIVE',
                                options: getGeneralStatusOptions(),
                                validate: (values: any) => {
                                    if (!values.status) return 'Status required!';

                                    return null;
                                },
                            },
                        ]}
                    />
                ),
                []
            )}
        </Card>
    );
};

export default Page;
