import React, { FC } from "react";
import { Row, Col, Card, Typography } from "antd";
import FileDrag from "../global/FileDrag";

const { Title } = Typography;

const Home: FC = () => (
    <div id="Home">
        <Row>
            <Col xs={24} sm={24} md={13} xl={10} xxl={13}>
                <Card bordered={false}>
                    <Title level={2}>Concept QA Tool</Title>
                    <FileDrag />
                </Card>
            </Col>
        </Row>
    </div>
);

export default Home;
