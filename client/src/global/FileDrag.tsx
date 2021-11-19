import React, { FC } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange (info: { file: { name?: any; status?: any; }; fileList: any; }) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop (e: { dataTransfer: { files: any; }; }) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const FileDrag: FC = () => (
    <Dragger {...props}>
        <p className="ant-upload-drag-icon">
            <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag .zip file to this area to upload</p>
        <p className="ant-upload-hint">
            Support for a single or bulk upload.
        </p>
    </Dragger>
)

export default FileDrag;