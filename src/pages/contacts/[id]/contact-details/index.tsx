import React, { useMemo, useState, useEffect } from 'react';

// third-party
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { PrimeIcons } from 'primereact/api';
import { Card } from 'primereact/card';
import _ from 'lodash';
import { getAuthorized } from '../../../../libs/auth';
import { getBannerTypeOptions, getGeneralStatusOptions } from '../../../../utils';
import { GenericViewGenerator, UrlBasedColumnItem } from '../../../../components';

// application

export const getServerSideProps: GetServerSideProps = async context =>
    getAuthorized(context, 'Contact Details Management', () => {
        const concernId = context.query.id as string;

        return {
            concernId,
        };
    });

const Page = ({ concernId }: { concernId: string }) => {
    const router = useRouter();

    const fields = [
        {
            type: 'text',
            name: 'contactCategoryId',
            placeholder: 'Enter a contact category id!',
            title: 'ContactCategoryId',
            initialValue: parseInt(concernId),
            isDisabled: true,
        },
        {
            type: 'text',
            name: 'name',
            placeholder: 'Enter a title!',
            title: 'Title',
            initialValue: null,
        },
        {
            type: 'text',
            name: 'email',
            placeholder: 'Enter a email!',
            title: 'Email',
            initialValue: null,
        },

        {
            type: 'text',
            name: 'designation',
            placeholder: 'Enter a longDescriptions!',
            title: 'Designation',
            initialValue: null,
        },
        {
            type: 'chips',
            name: 'phoneNumber',
            placeholder: 'Enter a phone number!',
            title: 'Phone Number',
            initialValue: null,
        },
    ];

    return (
        <Card>
            {useMemo(
                () => (
                    <GenericViewGenerator
                        name={'concern details'}
                        title="Concern Details"
                        subtitle="Manage concern details here!"
                        viewAll={{
                            uri: `/api/v1/contact-info`,
                            ignoredColumns: ['id', 'createdAt', 'updatedAt'],
                            scopedColumns: {
                                imageUrl: (item: any) => <UrlBasedColumnItem url={item.imageUrl} />,
                            },
                            actionIdentifier: 'id',
                            // onDataModify: data =>
                            //     _.map(data, datum => ({
                            //         ...datum,
                            //         parent: datum.parent ? datum.parent.name : null,
                            //     })),
                        }}
                        addNew={{
                            uri: `/api/v1/contact-info`,
                        }}
                        viewOne={{ uri: '/api/v1/contact-info/{id}', identifier: '{id}' }}
                        editExisting={{ uri: '/api/v1/contact-info/{id}', identifier: '{id}' }}
                        removeOne={{
                            uri: '/api/v1/contact-info/{id}',
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
