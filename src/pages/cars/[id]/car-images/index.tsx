import React, { useMemo, useEffect, useState } from 'react';

// third-party
import { GetServerSideProps } from 'next';
import { Card } from 'primereact/card';
import _ from 'lodash';

// application
import { getAuthorized } from '../../../../libs/auth';
import GenericViewGenerator from '../../../../components/global/GenericViewGenerator';
import { getBreadCrumbItems, getGeneralStatusOptions } from '../../../../utils';
import { getCarById } from '../../../../apis';
import { BreadCrumb } from 'primereact/breadcrumb';
import { usePathname } from 'next/navigation';
import { UrlBasedColumnItem } from '../../../../components';

export const getServerSideProps: GetServerSideProps = async context =>
    getAuthorized(context, 'Car Image Management', () => {
        const carId = context.query.id;

        return {
            carId,
        };
    });

const Page = ({ carId }: { carId: string }) => {
    const pathname = usePathname();
    const [car, setCar] = useState<any>(null);
    const [carName, setCarName] = useState<string>();
    const [breadcrumbItems, setBreadcrumbItems] = useState<any>(null);
    useEffect(() => {
        getCarById(carId)
            .then(response => {
                if (response.data) {
                    setCar(response.data);
                    setCarName(response.data.name);
                }
            })
            .catch(error => {
                console.error('error', error);
            })
            .finally(() => {});
    }, []);

    useEffect(() => {
        setBreadcrumbItems(getBreadCrumbItems(pathname, carName));
    }, [carName]);

    const home = { icon: 'pi pi-home', url: '/' };

    return (
        <>
            <BreadCrumb model={breadcrumbItems} home={home} />
            <Card>
                {useMemo(
                    () => (
                        <GenericViewGenerator
                            name={'carImage'}
                            title={`${car?.name} Image`}
                            subtitle="Manage Car Image here!"
                            viewAll={{
                                uri: `/api/v1/cars/${carId}/car-images`,
                                ignoredColumns: ['id', 'car', 'carId', 'createdAt', 'updatedAt'],
                                actionIdentifier: 'id',
                                scopedColumns: {
                                    src: (item: any) => <UrlBasedColumnItem url={item.src} />,
                                },
                                onDataModify: data =>
                                    _.map(data, datum => ({
                                        // parent: datum.parent ? datum.parent.name : null,
                                        carName: datum.car.name,
                                        ...datum,
                                    })),
                            }}
                            addNew={{
                                uri: `/api/v1/car-images`,
                            }}
                            // viewOne={{ uri: '/api/v1/product-images/{id}', identifier: '{id}' }}
                            // editExisting={{ uri: '/api/v1/product-images/{id}', identifier: '{id}' }}
                            removeOne={{
                                uri: '/api/v1/car-images/{id}',
                                identifier: '{id}',
                            }}
                            fields={[
                                {
                                    type: 'number',
                                    name: 'carId',
                                    placeholder: 'Select car ID',
                                    title: 'Car ID',
                                    initialValue: parseInt(carId),
                                    validate: (values: any) => {
                                        if (!values.carId) return 'Car Required!';

                                        return null;
                                    },
                                    isDisabled: true,
                                },
                                {
                                    type: 'text',
                                    name: 'src',
                                    placeholder: 'Select Image file!',
                                    title: 'Image',
                                    initialValue: null,
                                    validate: (values: any) => {
                                        if (!values.src) return 'Car Image Required!';

                                        return null;
                                    },
                                },
                                {
                                    type: 'text',
                                    name: 'alt',
                                    placeholder: 'Enter a alt!',
                                    title: 'ALT',
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
                    [car]
                )}
            </Card>
        </>
    );
};

export default Page;
