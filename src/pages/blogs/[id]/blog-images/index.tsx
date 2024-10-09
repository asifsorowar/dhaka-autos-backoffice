import React, { useMemo, useEffect, useState } from 'react';

// third-party
import { GetServerSideProps } from 'next';
import { Card } from 'primereact/card';
import _ from 'lodash';

// application
import { getAuthorized } from '../../../../libs/auth';
import GenericViewGenerator from '../../../../components/global/GenericViewGenerator';
import { getBreadCrumbItems, getGeneralStatusOptions } from '../../../../utils';
import { getBlogById } from '../../../../apis';
import { BreadCrumb } from 'primereact/breadcrumb';
import { usePathname } from 'next/navigation';
import { UrlBasedColumnItem } from '../../../../components';

export const getServerSideProps: GetServerSideProps = async context =>
    getAuthorized(context, 'Blog Image Management', () => {
        const blogId = context.query.id;

        return {
            blogId,
        };
    });

const Page = ({ blogId }: { blogId: string }) => {
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
    }, []);
    console.log({ product: blog });

    useEffect(() => {
        setBreadcrumbItems(getBreadCrumbItems(pathname, blogName));
    }, [blogName]);

    const home = { icon: 'pi pi-home', url: '/' };

    return (
        <>
            <BreadCrumb model={breadcrumbItems} home={home} />
            <Card>
                {useMemo(
                    () => (
                        <GenericViewGenerator
                            name={'blogImage'}
                            title={`${blog?.name} Image`}
                            subtitle="Manage Blog Image here!"
                            viewAll={{
                                uri: `/api/v1/blogs/${blogId}/blog-images`,
                                ignoredColumns: ['id', 'blog', 'blogId', 'createdAt', 'updatedAt'],
                                actionIdentifier: 'id',
                                scopedColumns: {
                                    src: (item: any) => <UrlBasedColumnItem url={item.src} />,
                                },
                                onDataModify: data =>
                                    _.map(data, datum => ({
                                        // parent: datum.parent ? datum.parent.name : null,
                                        blogName: datum.blog.name,
                                        ...datum,
                                    })),
                            }}
                            addNew={{
                                uri: `/api/v1/blog-images`,
                            }}
                            removeOne={{
                                uri: '/api/v1/blog-images/{id}',
                                identifier: '{id}',
                            }}
                            fields={[
                                {
                                    type: 'number',
                                    name: 'blogId',
                                    placeholder: 'Select blog ID',
                                    title: 'Blog ID',
                                    initialValue: parseInt(blogId),
                                    validate: (values: any) => {
                                        if (!values.blogId) return 'Blog Required!';

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
                                        if (!values.src) return 'Product Image Required!';

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
                    [blog]
                )}
            </Card>
        </>
    );
};

export default Page;
