import React, { FC } from "react";
import { Row, Col, Card, Typography } from "antd";
// import FileDrag from "../global/FileDrag";
import AdForm from "../global/AdForm";

const { Title, Text } = Typography;

const Home: FC = () => (
    <div id="Home">
        <Row>
            <Col xs={24} sm={24} md={13} xl={10} xxl={13}>
                <Card title={<Title className="title">Concept <Text className="sub-title">QA Tool</Text></Title>} bordered={false}>
                    <AdForm />
                </Card>
            </Col>
        </Row>
    </div>
);

export default Home;
