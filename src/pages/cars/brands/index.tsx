import React, { useMemo, useState, useEffect } from 'react';

// third-party
import { GetServerSideProps } from 'next';
import { Card } from 'primereact/card';
import _ from 'lodash';

// application
import { getAuthorized } from '../../../libs/auth';
import GenericViewGenerator from '../../../components/global/GenericViewGenerator';
import { UrlBasedColumnItem } from '../../../components';

export const getServerSideProps: GetServerSideProps = async context => getAuthorized(context, 'Car Brand Management');

const Page = () => {
    const fields = [
        {
            type: 'text',
            name: 'name',
            placeholder: 'Enter a name!',
            title: 'Name',
            initialValue: null,
            validate: (values: any) => {
                if (!values.name) return 'Required!';

                return null;
            },
        },
        {
            type: 'text',
            name: 'imageUrl',
            placeholder: 'Enter a imageUrl!',
            title: 'ImageUrl',
            initialValue: null,
            validate: (values: any) => {
                if (!values.imageUrl) return 'Required!';

                return null;
            },
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
    ];

    return (
        <Card>
            {useMemo(
                () => (
                    <GenericViewGenerator
                        name={'Car Brands'}
                        title="Car Brands"
                        subtitle="Manage car brands here!"
                        viewAll={{
                            uri: `/api/v1/car-brands`,
                            ignoredColumns: ['id', 'cars', 'createdAt', 'updatedAt'],
                            actionIdentifier: 'id',
                            scopedColumns: {
                                imageUrl: (item: any) => <UrlBasedColumnItem url={item.imageUrl} />,
                                imageUrlMobile: (item: any) => <UrlBasedColumnItem url={item.imageUrlMobile} />,
                            },
                            onDataModify: data =>
                                _.map(data, datum => ({
                                    ...datum,
                                    // role: datum.role.name,
                                })),
                        }}
                        addNew={{
                            uri: `/api/v1/car-brands`,
                        }}
                        viewOne={{ uri: '/api/v1/car-brands/{id}', identifier: '{id}' }}
                        editExisting={{ uri: '/api/v1/car-brands/{id}', identifier: '{id}' }}
                        removeOne={{
                            uri: '/api/v1/car-brands/{id}',
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
