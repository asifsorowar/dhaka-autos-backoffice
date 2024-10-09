import React, { useMemo, useState, useEffect } from 'react';

// third-party
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { PrimeIcons } from 'primereact/api';
import { Card } from 'primereact/card';
import _ from 'lodash';
import { getAuthorized } from '../../../../libs/auth';
import { getBannerTypeOptions, getGeneralStatusOptions } from '../../../../utils';
import { GenericViewGenerator, UrlBasedColumnItem } from '../../../../components';

// application

export const getServerSideProps: GetServerSideProps = async context =>
    getAuthorized(context, 'Concern Management', () => {
        const concernId = context.query.id as string;

        return {
            concernId,
        };
    });

const Page = ({ concernId }: { concernId: string }) => {
    const router = useRouter();

    const fields = [
        {
            type: 'text',
            name: 'concernId',
            placeholder: 'Enter a concernId!',
            title: 'ConcernId',
            initialValue: parseInt(concernId),
            isDisabled: true,
        },
        {
            type: 'text',
            name: 'name',
            placeholder: 'Enter a name!',
            title: 'Name',
            initialValue: null,
            validate: (values: any) => {
                if (!values.name) return 'Name required!';

                return null;
            },
        },
        {
            type: 'text',
            name: 'degisnation',
            placeholder: 'Enter a Degisnation!',
            title: 'Degisnation',
            initialValue: null,
            validate: (values: any) => {
                if (!values.degisnation) return 'Degisnation required!';

                return null;
            },
        },
    ];

    return (
        <Card>
            {useMemo(
                () => (
                    <GenericViewGenerator
                        name={'concern management'}
                        title="Concern Management"
                        subtitle="Manage concern management here!"
                        viewAll={{
                            uri: `/api/v1/concern-management`,
                            ignoredColumns: ['id', 'createdAt', 'updatedAt'],
                            scopedColumns: {
                                imageUrl: (item: any) => <UrlBasedColumnItem url={item.imageUrl} />,
                            },
                            actionIdentifier: 'id',
                            // onDataModify: data =>
                            //     _.map(data, datum => ({
                            //         ...datum,
                            //         parent: datum.parent ? datum.parent.name : null,
                            //     })),
                        }}
                        addNew={{
                            uri: `/api/v1/concern-management`,
                        }}
                        viewOne={{ uri: '/api/v1/concern-management/{id}', identifier: '{id}' }}
                        editExisting={{ uri: '/api/v1/concern-management/{id}', identifier: '{id}' }}
                        removeOne={{
                            uri: '/api/v1/concern-management/{id}',
                            identifier: '{id}',
                        }}
                        fields={fields}
                    />
                ),
                []
            )}
        </Card>
    );
};

export default Page;
