import React, { useMemo, useState, useEffect } from 'react';

// third-party
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { PrimeIcons } from 'primereact/api';
import { Card } from 'primereact/card';
import _ from 'lodash';
import { getBannerTypeOptions, getGeneralStatusOptions } from '../../utils';

// application
import { getAuthorized } from '../../libs/auth';
import GenericViewGenerator from '../../components/global/GenericViewGenerator';
import { UrlBasedColumnItem } from '../../components';

export const getServerSideProps: GetServerSideProps = async context => getAuthorized(context, 'Hero Banner Management');

const Page = () => {
    const router = useRouter();

    const fields = [
        {
            type: 'text',
            name: 'url',
            placeholder: 'Enter a url!',
            title: 'URL',
            initialValue: null,
        },
        {
            type: 'select-sync',
            name: 'type',
            placeholder: 'Select a type!',
            title: 'Type',
            initialValue: 'ACTIVE',
            options: getBannerTypeOptions(),
            validate: (values: any) => {
                if (!values.status) return 'Status required!';

                return null;
            },
        },
        {
            type: 'text',
            name: 'title',
            placeholder: 'Enter a title!',
            title: 'Title',
            initialValue: null,
        },
        {
            type: 'text',
            name: 'subtitle',
            placeholder: 'Enter a subtitle!',
            title: 'Subtitle',
            initialValue: null,
        },
        {
            type: 'text',
            name: 'titleColor',
            placeholder: 'Enter a title color!',
            title: 'Title Color',
            initialValue: null,
        },
        {
            type: 'text',
            name: 'subtitleColor',
            placeholder: 'Enter a subtitle color!',
            title: 'Subtitle Color',
            initialValue: null,
        },
        {
            type: 'text',
            name: 'description',
            placeholder: 'Enter a description!',
            title: 'Description',
            initialValue: null,
        },
        {
            type: 'text',
            name: 'logoUrl',
            placeholder: 'Enter a logoUrl!',
            title: 'Logo Url',
            initialValue: null,
        },
        {
            type: 'text',
            name: 'imageUrl',
            placeholder: 'Enter a image URL!',
            title: 'Image URL',
            initialValue: null,
        },
        {
            type: 'text',
            name: 'imageUrlMobile',
            placeholder: 'Enter a image URL for mobile!',
            title: 'Image URL for mobile',
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
    ];

    return (
        <Card>
            {useMemo(
                () => (
                    <GenericViewGenerator
                        name={'pageBanners'}
                        title="Page Banners"
                        subtitle="Manage page banners here!"
                        viewAll={{
                            uri: `/api/v1/banners`,
                            ignoredColumns: ['id', 'createdAt', 'updatedAt'],
                            scopedColumns: {
                                imageUrl: (item: any) => <UrlBasedColumnItem url={item.imageUrl} />,
                                imageUrlMobile: (item: any) => <UrlBasedColumnItem url={item.imageUrlMobile} />,
                            },
                            actionIdentifier: 'id',
                            // onDataModify: data =>
                            //     _.map(data, datum => ({
                            //         ...datum,
                            //         parent: datum.parent ? datum.parent.name : null,
                            //     })),
                        }}
                        addNew={{
                            uri: `/api/v1/banners`,
                        }}
                        viewOne={{ uri: '/api/v1/banners/{id}', identifier: '{id}' }}
                        editExisting={{ uri: '/api/v1/banners/{id}', identifier: '{id}' }}
                        removeOne={{
                            uri: '/api/v1/banners/{id}',
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
