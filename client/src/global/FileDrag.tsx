import React, { FC, useState } from 'react';
import { Form, Upload, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const FileDrag: FC = () => {
    const [fileList, setFileList] = useState([] as any);
    const [uploading, setUploading] = useState(false);
    const formData = new FormData();
   
    const props = {
        onRemove: (file: any) => {
            setFileList(fileList.filter(function(el: { name: any; }) { return el.name !== file.name }))
        },
        beforeUpload: (file: any) => {
            setFileList((fileList: any) => [...fileList, file]);
          return false;
        },
        showUploadList: {
            showRemoveIcon: !uploading,
        },
        fileList,
      };

    const onFinish = () => {
        fileList.forEach((file: string | Blob) => {
            formData.append('files[]', file);
        });

        setUploading(true);
    };

    return (
        <Form
            name="validate_other"
            onFinish={onFinish}
        >
            <Form.Item>
                <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                    <Upload.Dragger name="files" action="/upload" multiple accept=".zip" {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk .zip upload.</p>
                    </Upload.Dragger>
                </Form.Item>
            </Form.Item>

            <Form.Item wrapperCol={{}}>
                <Button type="primary" htmlType="submit" loading={uploading} disabled={fileList.length === 0}>
                    {fileList.length === 0? '' : uploading? "Uploading..." : "Let's go!"}
                </Button>
            </Form.Item>
        </Form>
    );
}

export default FileDrag;