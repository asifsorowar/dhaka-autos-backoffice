import React, { useMemo, useState, useEffect } from 'react';

// third-party
import { GetServerSideProps } from 'next';
import { Card } from 'primereact/card';
import _ from 'lodash';

// application
import { getAuthorized } from '../../../libs/auth';
import GenericViewGenerator from '../../../components/global/GenericViewGenerator';
import { IBrands } from '../../../types';
import { getBrands } from '../../../apis';
import { UrlBasedColumnItem } from '../../../components';

export const getServerSideProps: GetServerSideProps = async context => getAuthorized(context, 'Car Model Management');

const Page = () => {
    const [brands, setBrands] = useState<IBrands[] | null>([]);

    useEffect(() => {
        getBrands()
            .then(response => {
                if (!response) {
                    // showToast('error', 'Unsuccessful!', 'Server not working!');
                } else if (response.statusCode !== 200) {
                    // showToast('error', 'Unsuccessful!', response.message);
                } else {
                    // showToast('success', 'Success!', response.message);

                    setBrands(response.data);
                }
            })
            .catch(error => {
                console.error('error', error);

                // showToast('error', 'Unsuccessful!', 'Something went wrong!');
            });
    }, []);

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
            type: 'select-sync',
            name: 'brandId',
            placeholder: 'Select a brand!',
            title: 'Brands',
            initialValue: null,
            options: _.map(brands, (brand: { id: number; name: string }) => ({
                value: brand.id,
                label: brand.name,
            })),
            validate: (values: any) => {
                if (!values.brandId) return 'brand required!';

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
                        name={'Car Models'}
                        title="Car Models"
                        subtitle="Manage car models here!"
                        viewAll={{
                            uri: `/api/v1/car-models`,
                            ignoredColumns: ['id', 'createdAt', 'updatedAt'],
                            scopedColumns: {
                                brand: (item: any) => item.brand?.name,
                                imageUrl: (item: any) => <UrlBasedColumnItem url={item.imageUrl} />,
                                imageUrlMobile: (item: any) => <UrlBasedColumnItem url={item.imageUrlMobile} />,
                            },
                            actionIdentifier: 'id',
                            onDataModify: data =>
                                _.map(data, datum => ({
                                    ...datum,
                                    // role: datum.role.name,
                                })),
                        }}
                        addNew={{
                            uri: `/api/v1/car-models`,
                        }}
                        viewOne={{ uri: '/api/v1/car-models/{id}', identifier: '{id}' }}
                        editExisting={{ uri: '/api/v1/car-models/{id}', identifier: '{id}' }}
                        removeOne={{
                            uri: '/api/v1/car-models/{id}',
                            identifier: '{id}',
                        }}
                        fields={fields}
                    />
                ),
                [brands]
            )}
        </Card>
    );
};

export default Page;
