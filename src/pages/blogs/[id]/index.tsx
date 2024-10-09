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
import { getBlogById } from '../../../apis';
import { IBrands } from '../../../types';

export const getServerSideProps: GetServerSideProps = async context =>
    getAuthorized(context, 'Blog Details', () => {
        const blogId = context.query.id;

        return {
            blogId,
        };
    });

const Page = ({ blogId }: { blogId: string }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [blog, setBlog] = useState<any>(null);
    const [blogName, setBlogName] = useState<string>();
    const [breadcrumbItems, setBreadcrumbItems] = useState<any>(null);

    useEffect(() => {
        getBlogById(blogId)
            .then(response => {
                if (!response) {
                    // showToast('error', 'Unsuccessful!', 'Server not working!');
                } else if (response.statusCode !== 200) {
                    // showToast('error', 'Unsuccessful!', response.message);
                } else {
                    // showToast('success', 'Success!', response.message);

                    setBlog(response.data);

                    setBlogName(response.data.name);
                }
            })
            .catch(error => {
                console.error('error', error);

                // showToast('error', 'Unsuccessful!', 'Something went wrong!');
            })
            .finally(() => {});
        setBreadcrumbItems(getBreadCrumbItems(pathname, blogName));
    }, [blogName]);

    const home = { icon: 'pi pi-home', url: '/' };

    return (
        <>
            <BreadCrumb model={breadcrumbItems} home={home} />
            <Card title="Blog Details" subTitle={blogName}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <div style={{ width: '200px', display: 'flex', flexDirection: 'column' }}>
                        <Button
                            label="Blog Image"
                            severity={`${blog?.images.length > 0 ? 'info' : 'danger'}`}
                            className="mr-2"
                            onClick={() => {
                                router.push(`/blogs/${blogId}/blog-images`);
                            }}
                        />
                        <span style={{ color: 'red', fontSize: '12px' }}>
                            {blog?.images.length > 0 ? '' : 'Image not found'}
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
                            placeholder: 'Enter a title!',
                            title: 'Title',
                            initialValue: blog?.name,
                            validate: (values: any) => {
                                if (!values.name) return 'Title required!';

                                return null;
                            },
                        },
                        {
                            type: 'richtext',
                            name: 'descriptions',
                            placeholder: 'Enter a blog descriptions!',
                            title: 'Blog Descriptions',
                            initialValue: blog?.descriptions,
                        },

                        {
                            type: 'number',
                            name: 'serial',
                            placeholder: 'Enter a serial!',
                            title: 'Serial',
                            initialValue: blog?.serial,
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
                            initialValue: blog?.status,
                            options: getGeneralStatusOptions(),
                            validate: (values: any) => {
                                if (!values.status) return 'Status required!';

                                return null;
                            },
                        },
                    ]}
                    // submitButtonShow={false}
                    callback={(data, resetForm: any) => {
                        callPutApi(`/api/v1/blogs/${blogId}`, data, null, 'application/json', true)
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
