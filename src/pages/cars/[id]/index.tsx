import React, { useMemo, useState, useEffect, useCallback } from 'react';

// third-party
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { PrimeIcons } from 'primereact/api';
import { Card } from 'primereact/card';
import { usePathname } from 'next/navigation';
import _ from 'lodash';
import { getBreadCrumbItems, getGeneralStatusOptions } from '../../../utils';

// application

import { getAuthorized } from '../../../libs/auth';
import GenericFormGenerator, { IField } from '../../../components/global/GenericFormGenerator';
import { getFormData } from '../../../utils';
import { callPostApi, callPutApi } from '../../../libs/api';
import { Button } from 'primereact/button';
import { BreadCrumb } from 'primereact/breadcrumb';
import { getBrands, getCarById, getModels } from '../../../apis';
import { IBrands, IModels } from '../../../types';

export const getServerSideProps: GetServerSideProps = async context =>
    getAuthorized(context, 'Car Details', () => {
        const carId = context.query.id;

        return {
            carId,
        };
    });

const Page = ({ carId }: { carId: string }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [car, setCar] = useState<any>(null);
    const [carName, setCarName] = useState<string>();
    const [breadcrumbItems, setBreadcrumbItems] = useState<any>(null);
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

                setFilteredModels(response.data?.filter((model: IModels) => model.id === car?.modelId));
            })
            .catch(error => {
                console.error('error', error);
            });

        getCarById(carId)
            .then(response => {
                if (response.data) {
                    setCar(response.data);
                    setCarName(response.data.name);
                }
            })
            .catch(error => {
                console.error('error', error);
            });

        setBreadcrumbItems(getBreadCrumbItems(pathname, carName));
    }, [carName]);

    const home = { icon: 'pi pi-home', url: '/' };

    return (
        <>
            <BreadCrumb model={breadcrumbItems} home={home} />
            <Card title="Car Details" subTitle={carName}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <div style={{ width: '200px', display: 'flex', flexDirection: 'column' }}>
                        <Button
                            label="Car Image"
                            severity={`${car?.carImages?.length > 0 ? 'info' : 'danger'}`}
                            className="mr-2"
                            onClick={() => {
                                router.push(`/cars/${carId}/car-images`);
                            }}
                        />
                        <span style={{ color: 'red', fontSize: '12px' }}>
                            {car?.carImages?.length > 0 ? '' : 'Image not found'}
                        </span>
                    </div>
                </div>
                <br />
                <br />

                <GenericFormGenerator
                    fields={[
                        {
                            type: 'text',
                            name: 'name',
                            placeholder: 'Enter a name!',
                            title: 'Name',
                            initialValue: car?.name,
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
                            initialValue: car?.brandId,
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
                            initialValue: car?.modelId,
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
                            initialValue: car?.materials,
                        },
                        {
                            type: 'richtext',
                            name: 'carDescriptions',
                            placeholder: 'Enter a car descriptions!',
                            title: 'Car Descriptions',
                            initialValue: car?.carDescriptions,
                        },
                        {
                            type: 'number',
                            name: 'serial',
                            placeholder: 'Enter a serial!',
                            title: 'Serial',
                            initialValue: car?.serial,
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
                            initialValue: car?.status,
                            options: getGeneralStatusOptions(),
                            validate: (values: any) => {
                                if (!values.status) return 'Status required!';

                                return null;
                            },
                        },
                    ]}
                    // submitButtonShow={false}
                    callback={(data, resetForm: any) => {
                        callPutApi(`/api/v1/cars/${carId}`, data, null, 'application/json', true)
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
        </>
    );
};

export default Page;
