import React, { useMemo, useState, useEffect } from 'react';

// third-party
import { GetServerSideProps } from 'next';
import { Card } from 'primereact/card';
import _ from 'lodash';

// application
import { getAuthorized } from '../../libs/auth';
import GenericViewGenerator from '../../components/global/GenericViewGenerator';

export const getServerSideProps: GetServerSideProps = async context => getAuthorized(context, 'Contact Management');

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
            type: 'email',
            name: 'email',
            placeholder: 'Enter email!',
            title: 'Email',
            initialValue: null,
            validate: (values: any) => {
                if (!values.email) return 'Required!';

                return null;
            },
        },
        {
            type: 'text',
            name: 'message',
            placeholder: 'Enter message!',
            title: 'Message',
            initialValue: null,
            validate: (values: any) => {
                if (!values.message) return 'Required!';

                return null;
            },
        },
    ];

    return (
        <Card>
            {useMemo(
                () => (
                    <GenericViewGenerator
                        name={'Website Contact'}
                        title="Website Contact"
                        subtitle="Manage blog categories here!"
                        viewAll={{
                            uri: `/api/v1/website-contacts`,
                            ignoredColumns: ['id', 'createdAt', 'updatedAt'],
                            actionIdentifier: 'id',
                            onDataModify: data =>
                                _.map(data, datum => ({
                                    ...datum,
                                    // role: datum.role.name,
                                })),
                        }}
                        // addNew={{
                        //     uri: `public/api/v1/website-contacts`,
                        // }}
                        // viewOne={{ uri: '/api/v1/website-contacts/{id}', identifier: '{id}' }}
                        // editExisting={{ uri: '/api/v1/website-contacts/{id}', identifier: '{id}' }}
                        removeOne={{
                            uri: '/api/v1/website-contacts/{id}',
                            identifier: '{id}',
                        }}
                        // fields={fields}
                        // editFields={fields.filter(
                        //     field => field.name !== 'email' && field.name !== 'password' && field.name !== 'type'
                        // )}
                    />
                ),
                []
            )}
        </Card>
    );
};

export default Page;
