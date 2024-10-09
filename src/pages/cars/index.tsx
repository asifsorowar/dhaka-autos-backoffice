import React, { useMemo, useState, useEffect, useCallback } from 'react';

// third-party
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { PrimeIcons } from 'primereact/api';
import { Card } from 'primereact/card';
import { BreadCrumb } from 'primereact/breadcrumb';
import { usePathname } from 'next/navigation';
import _ from 'lodash';

// application
import { generateQueryPath, getBreadCrumbItems, getGeneralStatusOptions } from '../../utils';
import { getAuthorized } from '../../libs/auth';
import GenericViewGenerator from '../../components/global/GenericViewGenerator';
import { IField } from '../../components/global/GenericFormGenerator';
import { UrlBasedColumnItem } from '../../components';
import FilterComponent from '../../components/global/Filter';
import PaginatorComponent from '../../components/global/Paginator';

export const getServerSideProps: GetServerSideProps = async context => getAuthorized(context, 'Car Management');

const Page = () => {
    const router = useRouter();
    const pathname = usePathname();

    const [breadcrumbItems, setBreadcrumbItems] = useState<any>(null);

    useEffect(() => {
        setBreadcrumbItems(getBreadCrumbItems(pathname));
    }, []);

    const home = { icon: 'pi pi-home', url: '/' };
    return (
        <>
            <BreadCrumb model={breadcrumbItems} home={home} />
            <Card>
                {useMemo(
                    () => (
                        <GenericViewGenerator
                            name={'car'}
                            title="Cars"
                            subtitle="Manage car here!"
                            // hasRef={true}
                            viewAll={{
                                uri: `/api/v1/cars${generateQueryPath('', null, router.query)}`,
                                ignoredColumns: ['brandId', 'modelId', 'createdAt', 'updatedAt'],
                                scopedColumns: {
                                    carImages: (item: any) =>
                                        item.carImages.map((image: any) => <UrlBasedColumnItem url={image.src} />),
                                    brand: (item: any) => item.brand.name,
                                    model: (item: any) => item.model.name,
                                },
                                actionIdentifier: 'id',
                                onDataModify: data =>
                                    _.map(data, datum => ({
                                        // parent: datum.parent ? datum.parent.name : null,
                                        createdDate: new Date(datum.createdAt.toString())?.toLocaleDateString('en-GB', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        }),
                                        ...datum,
                                    })),
                            }}
                            viewOne={{ uri: '/api/v1/cars/{id}', identifier: '{id}' }}
                            // editExisting={{ uri: '/api/v1/products/{id}', identifier: '{id}' }}
                            removeOne={{
                                uri: '/api/v1/cars/{id}',
                                identifier: '{id}',
                            }}
                            customActions={[
                                {
                                    color: 'info',
                                    icon: PrimeIcons.ARROW_RIGHT,
                                    text: 'Car Details',
                                    callback: identifier => {
                                        router.push(`/cars/${identifier}`);
                                    },
                                },
                            ]}
                            // fields={fields}
                            filtration={
                                <FilterComponent
                                    router={router}
                                    fields={[
                                        {
                                            type: 'select-sync',
                                            name: 'status',
                                            placeholder: 'Select a status!',
                                            title: 'Status',
                                            initialValue: null,
                                            options: getGeneralStatusOptions(),
                                        },
                                        {
                                            type: 'text',
                                            name: 'search',
                                            placeholder: 'Search ',
                                            title: 'Search',
                                            initialValue: null,
                                        },
                                    ]}
                                />
                            }
                            pagination={<PaginatorComponent router={router} />}
                        />
                    ),
                    [router]
                )}
            </Card>
        </>
    );
};

export default Page;
