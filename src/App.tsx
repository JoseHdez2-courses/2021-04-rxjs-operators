import "./styles.css";
import * as Parts from "./components/parts";
import { Tabs, Tab } from "react-bootstrap";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useRef, useState } from "react";
import dashify from "dashify";

const parts = [Parts.Part01, Parts.Part02, Parts.Part03, Parts.Part04];

export default function App() {
  const monaco = useMonaco();

  return (
    <div>
      <Tabs defaultActiveKey="part-02" id="uncontrolled-tab-example">
        {parts.map((p, i) => (
          <Tab eventKey={dashify(`Part ${i + 1}`)} title={`Part ${i + 1}`}>
            <PartTab p={p} />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

const PartTab = ({ p }) => (
  <>
    <div style={{ margin: "1rem" }}>{p()}</div>
    <div style={{ width: "90%", margin: "auto" }}>
      <h6 style={{ marginTop: "2rem" }}>Code:</h6>
      <Editor
        options={{ readOnly: true }}
        value={p.toString()}
        height="40vh"
        language="javascript"
        theme="vs-dark"
      />
    </div>
  </>
);
