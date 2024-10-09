import React, { useMemo, useState, useEffect } from 'react';

// third-party
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { PrimeIcons } from 'primereact/api';
import { Card } from 'primereact/card';
import _ from 'lodash';
import { getGeneralStatusOptions, getIsFeaturedOptions } from '../../utils';

// application
import { getAuthorized } from '../../libs/auth';
import GenericViewGenerator from '../../components/global/GenericViewGenerator';
import { UrlBasedColumnItem } from '../../components';

export const getServerSideProps: GetServerSideProps = async context => getAuthorized(context, 'Contact Management');

const Page = () => {
    const router = useRouter();

    const fields = [
        {
            type: 'text',
            name: 'title',
            placeholder: 'Enter a title!',
            title: 'Title',
            initialValue: null,
            validate: (values: any) => {
                if (!values.title) return 'Title required!';

                return null;
            },
        },
    ];

    return (
        <Card>
            {useMemo(
                () => (
                    <GenericViewGenerator
                        name={'contacts'}
                        title="Contacts"
                        subtitle="Manage contacts  here!"
                        viewAll={{
                            uri: `/api/v1/contact-category`,
                            ignoredColumns: ['id', 'subcategories', 'parentId', 'createdAt', 'updatedAt'],
                            scopedColumns: {
                                imageUrl: (item: any) => <UrlBasedColumnItem url={item.imageUrl} />,
                                imageUrlMobile: (item: any) => <UrlBasedColumnItem url={item.imageUrlMobile} />,
                                bannerImageUrl: (item: any) => <UrlBasedColumnItem url={item.bannerImageUrl} />,
                            },
                            actionIdentifier: 'id',
                            onDataModify: data =>
                                _.map(data, datum => ({
                                    ...datum,
                                    parent: datum.parent ? datum.parent.name : null,
                                    isFeatured: datum.isFeatured === true ? 'Yes' : 'No',
                                    isOnNavbar: datum.isOnNavbar === true ? 'Yes' : 'No',
                                })),
                        }}
                        addNew={{
                            uri: `/api/v1/contact-category`,
                        }}
                        viewOne={{ uri: '/api/v1/contact-category/{id}', identifier: '{id}' }}
                        editExisting={{ uri: '/api/v1/contact-category/{id}', identifier: '{id}' }}
                        removeOne={{
                            uri: '/api/v1/contact-category/{id}',
                            identifier: '{id}',
                        }}
                        fields={fields}
                        customActions={[
                            {
                                color: 'info',
                                icon: PrimeIcons.ARROW_RIGHT,
                                text: 'Contact-details',
                                callback: identifier => {
                                    router.push(`/contacts/${identifier}/contact-details`);
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
