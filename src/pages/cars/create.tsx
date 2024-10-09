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
import { IBrands, IModels } from '../../types';
import { getBrands, getModels } from '../../apis';

export const getServerSideProps: GetServerSideProps = async context => getAuthorized(context, 'Create Car');

const Page = () => {
    const router = useRouter();
    const [brands, setBrands] = useState<IBrands[] | null>(null);
    const [allModels, setAllModels] = useState<IModels[] | null | undefined>(null);
    const [filteredModels, setFilteredModels] = useState<IModels[] | undefined>([]);

    useEffect(() => {
        getBrands()
            .then(response => {
                if (response.data) setBrands(response.data);
            })
            .catch(error => {
                console.error('error', error);
            });

        getModels()
            .then(response => {
                if (response.data) setAllModels(response.data);
            })
            .catch(error => {
                console.error('error', error);
            });
    }, []);
    return (
        <Card title="Car entry" subTitle="To create a car, please submit the form properly...">
            <GenericFormGenerator
                fields={[
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

                        onChange(name: string, value: any) {
                            setFilteredModels(allModels?.filter(model => model.brandId === value));
                        },
                    },
                    {
                        type: 'select-sync',
                        name: 'modelId',
                        placeholder: 'Select a Model!',
                        title: 'Models',
                        initialValue: null,
                        options: _.map(filteredModels || [], (model: { id: number; name: string }) => ({
                            value: model.id,
                            label: model.name,
                        })),
                        validate: (values: any) => {
                            if (!values.brandId) return 'model required!';
                            return null;
                        },
                    },
                    {
                        type: 'text',
                        name: 'materials',
                        placeholder: 'Enter a materials!',
                        title: 'Materials',
                        initialValue: null,
                    },
                    {
                        type: 'richtext',
                        name: 'carDescriptions',
                        placeholder: 'Enter a car descriptions!',
                        title: 'Car Descriptions',
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
                    callPostApi('/api/v1/cars', data, null, 'application/json', true)
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
