import React, { useMemo } from 'react';
import { GenericFormGenerator, GenericViewGenerator } from '../../components';
import { Card } from 'primereact/card';
import { callPostApi } from '../../libs/api';
import _ from 'lodash';
const fields = [
    {
        type: 'text',
        name: 'title',
        placeholder: 'Enter a title!',
        title: 'Title',
        initialValue: null,
        validate: (values: any) => {
            if (!values.title) return 'Required!';

            return null;
        },
    },
    {
        type: 'text',
        name: 'imageUrl',
        placeholder: 'Enter a image url!',
        title: 'ImageUrl',
        initialValue: null,
        validate: (values: any) => {
            if (!values.imageUrl) return 'Required!';

            return null;
        },
    },
    {
        type: 'text',
        name: 'descriptions',
        placeholder: 'Enter a descriptions!',
        title: 'Descriptions',
        initialValue: null,
        validate: (values: any) => {
            if (!values.descriptions) return 'Required!';

            return null;
        },
    },
];
const Index = () => {
    const handleSubmit = () => {};
    return (
        <div>
            <Card title="Home About Us">
                {useMemo(
                    () => (
                        <GenericViewGenerator
                            name={'home about us'}
                            title="Home About Us"
                            subtitle="Manage home about us here!"
                            viewAll={{
                                uri: `/api/v1/home-about-us`,
                                ignoredColumns: ['id', 'createdAt', 'updatedAt'],

                                actionIdentifier: 'id',
                                onDataModify: data =>
                                    _.map(data, datum => ({
                                        ...datum,
                                    })),
                            }}
                            viewOne={{ uri: '/api/v1/home-about-us/{id}', identifier: '{id}' }}
                            editExisting={{
                                uri: '/api/v1/home-about-us/{id}',
                                identifier: '{id}',
                            }}
                            fields={fields}
                        />
                    ),
                    []
                )}
            </Card>
        </div>
    );
};

export default Index;
