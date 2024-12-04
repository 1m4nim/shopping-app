import React from "react";
import { Button, Flex } from "antd";

const NewpageButton: React.FC = () => (
  <Flex gap="small" wrap>
    <Button
      style={{
        backgroundColor: "#DEB887",
        color: "black",
        height: "3rem",
      }}
    >
      お買い物へ出発！
    </Button>
  </Flex>
);

export default NewpageButton;
