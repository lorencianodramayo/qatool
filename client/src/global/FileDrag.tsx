import React, { FC } from 'react';
import { Form, Upload, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';


const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const FileDrag: FC = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            name="validate_other"
            onFinish={onFinish}
        >
            <Form.Item>
                <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                    <Upload.Dragger name="files" action="/upload.do" multiple>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk .zp upload.</p>
                    </Upload.Dragger>
                </Form.Item>
            </Form.Item>

            <Form.Item wrapperCol={{  }}>
                <Button type="primary" htmlType="submit" loading={true} disabled={false}>
                Ready to go!
                </Button>
            </Form.Item>
        </Form>
    );
}

export default FileDrag;