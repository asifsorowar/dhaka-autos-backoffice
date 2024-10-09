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

export const getServerSideProps: GetServerSideProps = async context => getAuthorized(context, 'Concern Management');

const Page = () => {
    const router = useRouter();

    const fields = [
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
            name: 'imageUrl',
            placeholder: 'Enter a imageUrl!',
            title: 'Image Url',
            initialValue: null,
        },
        {
            type: 'text',
            name: 'title',
            placeholder: 'Enter a title!',
            title: 'title',
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
            name: 'bannerUrl',
            placeholder: 'Enter a bannerUrl!',
            title: 'bannerUrl',
            initialValue: null,
        },
        {
            type: 'text',
            name: 'bannerUrlMobile',
            placeholder: 'Enter a banner url for mobile!',
            title: 'Banner Url For Mobile',
            initialValue: null,
        },
        {
            type: 'text',
            name: 'videoUrl',
            placeholder: 'Enter a videoUrl!',
            title: 'Video Url',
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
            name: 'bannerDescription',
            placeholder: 'Enter a bannerDescription!',
            title: 'Banner Description',
            initialValue: null,
        },
        {
            type: 'text',
            name: 'bannerButtonUrl',
            placeholder: 'Enter a banner button url!',
            title: 'Banner Button Url',
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
                        name={'concerns'}
                        title="Concerns"
                        subtitle="Manage concerns  here!"
                        viewAll={{
                            uri: `/api/v1/concerns`,
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
                            uri: `/api/v1/concerns`,
                        }}
                        viewOne={{ uri: '/api/v1/concerns/{id}', identifier: '{id}' }}
                        editExisting={{ uri: '/api/v1/concerns/{id}', identifier: '{id}' }}
                        removeOne={{
                            uri: '/api/v1/concerns/{id}',
                            identifier: '{id}',
                        }}
                        fields={fields}
                        customActions={[
                            {
                                color: 'info',
                                icon: PrimeIcons.ARROW_RIGHT,
                                text: 'Concern-details',
                                callback: identifier => {
                                    router.push(`/concerns/${identifier}/concern-details`);
                                },
                            },
                            {
                                color: 'info',
                                icon: PrimeIcons.ARROW_RIGHT,
                                text: 'Concern-gallery',
                                callback: identifier => {
                                    router.push(`/concerns/${identifier}/concern-gallery`);
                                },
                            },
                            {
                                color: 'info',
                                icon: PrimeIcons.ARROW_RIGHT,
                                text: 'Concern-management',
                                callback: identifier => {
                                    router.push(`/concerns/${identifier}/concern-management`);
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
