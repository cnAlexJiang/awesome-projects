// Alert message using AutoAnimate


import React, { useState, useRef } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';

export default function () {
  const [parent] = useAutoAnimate(/* optional config */)



    return (
            <Form name="dynamic_form_nest_item" autoComplete="off"   >
                <Form.List name="users">
                    {(fields, { add, remove }) => (
                        <div ref={parent}>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space
                                    key={key}
                                    style={{
                                        display: 'flex',
                                        marginBottom: 8,
                                    }}
                                    align="baseline"
                                >
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'first']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing first name',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="First Name" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'last']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing last name',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Last Name" />
                                    </Form.Item>
                                    <MinusCircleOutlined 
                                      onClick={() => remove(name)} 
                                      />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button 
                                    type="dashed" 
                                    onClick={() => add()} 
                                    block 
                                    icon={<PlusOutlined/>
                                    }>
                                    Add field
                                </Button>
                            </Form.Item>
                        </div>
                    )}
                </Form.List>
            </Form>
    );
};
