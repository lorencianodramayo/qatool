import React, { FC, useEffect, createRef, useState } from 'react';
import { Form, Button, Select, Row, Col, Carousel, Checkbox } from 'antd';
import axios from 'axios';

const { Option } = Select;

const AdForm: FC = () => {
    const [form] = Form.useForm();
    const carouselRef: any = createRef();
    const [counter, setCounter] = useState(0);
    const [partners, setPartners] = useState([]);
    const [concepts, setConcepts] = useState([]);
    const [channels, setChannel] = useState([]);
    const [isChannel, setIsChannel] = useState(true);

    useEffect(() => {
        form.setFieldsValue({
            Partner: '',
            Concept: '',
            Channel: '',
        });
        axios.get('/getPartners').then(c => setPartners(c.data.body));
    }, [form])

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onGenderChange = (value: string) => {
        switch (value) {
            case 'male':
                form.setFieldsValue({ note: 'Hi, man!' });
                return;
            case 'female':
                form.setFieldsValue({ note: 'Hi, lady!' });
                return;
            case 'other':
                form.setFieldsValue({ note: 'Hi there!' });
        }
    };

    const onPartnerChange = (value: string) => {
        setConcepts([]);
        setChannel([]);
        setIsChannel(true)
        form.setFieldsValue({
            Concept: '',
            Channel: '',
        });
        axios.get('/getConcepts', { params: { pId: value } }).then(c => setConcepts(c.data.body));
    }

    const onConceptChange = (value: string) => {
        if (value === undefined) {
            setChannel([]);
            setIsChannel(true)
            form.setFieldsValue({
                Channel: '',
            });
        }else{
            axios.get('/getCreatives', { params: { pId: form.getFieldValue("Partner"), cId: value } })
                .then(c => {
                    console.log(c.data)
                    setChannel(c.data.body.templates);
                });
        }
    }

    // const getVersionName = (value: string, size: string) => {
    //     axios.get('/getVersion', { params: { vId: value, pId: form.getFieldValue("Partner")}})
    //         .then(v => setVersions(prevState => ({ ...prevState, [size]: v.data.body })));
    // }

    return (
        <div>
            <Form
                name="forms"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
                form={form}
                initialValues={{
                    Partner: '',
                    Concept: '',
                    Channel: ''
                }}
            >

                <Carousel ref={carouselRef} dots={false}>
                    <Row>
                        <Col span={24}>
                            <Form.Item name="Partner" label="Partner Group" rules={[{ required: true }]}>
                                <Select
                                    showSearch
                                    size="large"
                                    allowClear
                                    loading={partners.length > 0 ? false : true}
                                    onChange={onPartnerChange}
                                    disabled={partners.length > 0? false:true}
                                    optionFilterProp="children"
                                >
                                    {
                                        partners.length > 0 ?
                                            partners.map((data: any, index: any)=> {
                                                return <Option value={data._id} key={index}>{data.name}</Option>
                                            })
                                        :null
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item name="Concept" label="Concept" rules={[{ required: true }]}>
                                <Select
                                    showSearch
                                    size="large"
                                    allowClear
                                    loading={concepts.length > 0 ? false : true}
                                    onChange={onConceptChange}
                                    disabled={concepts.length > 0 ? false : true}
                                    optionFilterProp="children"
                                >
                                    {
                                        concepts.length > 0 ?
                                            concepts.map((data: any, index: any) => {
                                                return <Option value={data._id} key={index}>{data.name}</Option>
                                            })
                                            : null
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item name="Channel" label="Channel" rules={[{ required: true }]}>
                                <Select
                                    showSearch
                                    size="large"
                                    allowClear
                                    loading={channels.length > 0 ? false : true}
                                    disabled={channels.length > 0 ? false : true}
                                    onChange={(e) => e !== undefined ? setIsChannel(false) : setIsChannel(true)}
                                    optionFilterProp="children"
                                    style={{textTransform:'capitalize'}}
                                >
                                    {
                                        
                                        channels.length > 0 ?
                                            Array.from(new Set(channels.map((data: any) => data.suitableChannels.join())))
                                                .filter(item => item !== "social,video")
                                                .map((data: any, index: any) => {
                                                    return <Option value={data} key={index} style={{ textTransform: 'capitalize'}}>{data}</Option>
                                            })
                                            : null
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row gutter={[8, 8]}>
                                {
                                    channels.map((data:any, index:any) => {
                                        return data.suitableChannels[0] === form.getFieldValue("Channel") && data.suitableChannels.length  === 1?
                                        (
                                            <React.Fragment key={index}>
                                                <Col span={1}>
                                                    <Form.Item name={data._id} valuePropName="checked" style={{ margin: 0 }}>
                                                        <Checkbox />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={7} style={{ display: "flex", fontWeight: 700, alignItems: "center", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingLeft: '0.8em' }}>{data.size}</Col>
                                                <Col span={11}>
                                                    <Form.Item name={`${data._id}_creativeVersion`} style={{ margin: 0 }}>
                                                        <Select
                                                            onChange={onGenderChange}
                                                            disabled={false}
                                                            placeholder={/^-?\d+$/.test(data.versionName) || data.versionName === null ?  `Version ${data.version + 1}` : data.versionName }
                                                           // onDropdownVisibleChange={(open) => open ? getVersionName(data.generation, data.size) : null}
                                                        >
                                                            <Option value="demo">Version 1</Option>
                                                            {/*Object.keys(versions).length > 0 ?
                                                                [versions[data.size as keyof typeof versions]].map((arr: any, index: any) => {
                                                                return arr !== undefined || arr !== null?
                                                                    <div key={index}>
                                                                        {
                                                                            arr !== undefined || arr !== null ?
                                                                                Object.keys(arr).map((ver: any, keys: any) => {
                                                                                    return <Option value="demo" key={keys}>Version {ver}</Option>
                                                                                })
                                                                            : null
                                                                        }
                                                                    </div>
                                                                : null
                                                                })
                                                            : null*/}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={5}>
                                                        <Button block>Preview</Button>
                                                </Col>
                                            </React.Fragment>
                                        ): null;
                                    })
                                }
                            </Row>
                        </Col>
                    </Row>
                </Carousel>
                <Row className="submit-row">
                    <Col className="submit-col">
                        <Row style={{ width: '100%' }}>
                            <Col span={12}>
                                <Button ghost htmlType="button" style={{ display: counter === 0 ? 'none' : 'block' }} disabled={false} onClick={() => {
                                    carouselRef.current.prev();
                                    setCounter(0);
                                }}>
                                    Partner Groups & Concepts
                                </Button>
                            </Col>
                            <Col span={12} style={{ display: 'flex', justifyContent: "flex-end" }}>
                                {
                                    counter > 0 ?
                                        <Button type="primary" htmlType="submit" disabled={false} loading={false}>
                                            Let's go!
                                        </Button>
                                        :

                                        <Button htmlType="button" type="primary" disabled={isChannel} onClick={() => {
                                            carouselRef.current.next();
                                            setCounter(1);
                                        }}>
                                            Creative Templates
                                        </Button>
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default AdForm;