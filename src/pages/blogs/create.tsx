import React, { useMemo, useState, useEffect, useCallback } from 'react';

// third-party
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { PrimeIcons } from 'primereact/api';
import { Card } from 'primereact/card';
import _ from 'lodash';
import { getGeneralStatusOptions } from '../../utils';

// application
import { getAuthorized } from '../../libs/auth';
import GenericViewGenerator from '../../components/global/GenericViewGenerator';
import GenericFormGenerator, { IField } from '../../components/global/GenericFormGenerator';
import { getFormData } from '../../utils';
import { callPostApi } from '../../libs/api';
import { IBrands } from '../../types';

export const getServerSideProps: GetServerSideProps = async context => getAuthorized(context, 'Create Blog');

const Page = () => {
    const router = useRouter();

    return (
        <Card title="Blog entry" subTitle="To create a blog, please submit the form properly...">
            <GenericFormGenerator
                fields={[
                    {
                        type: 'text',
                        name: 'name',
                        placeholder: 'Enter a blog title!',
                        title: 'Title',
                        initialValue: null,
                        validate: (values: any) => {
                            if (!values.name) return 'Title required!';

                            return null;
                        },
                    },
                    {
                        type: 'richtext',
                        name: 'descriptions',
                        placeholder: 'Enter a blog descriptions!',
                        title: 'Blog Descriptions',
                        initialValue: null,
                    },
                    {
                        type: 'number',
                        name: 'serial',
                        placeholder: 'Enter a serial!',
                        title: 'Serial',
                        initialValue: 9999,
                        validate: (values: any) => {
                            if (!values.serial) return 'Serial required!';

                            return null;
                        },
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
                callback={(data, resetForm: any) => {
                    callPostApi('/api/v1/blogs', data, null, 'application/json', true)
                        .then(response => {
                            if (response.statusCode === 200) {
                                console.log(response);
                                resetForm();
                            }
                        })
                        .catch(error => {
                            console.error('error', error);
                        })
                        .finally(() => {});
                }}
                enableReinitialize={true}
            ></GenericFormGenerator>
        </Card>
    );
};

export default Page;
