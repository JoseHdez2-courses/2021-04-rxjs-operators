import "./styles.css";
import * as Parts from "./components/parts";
import { Tabs, Tab } from "react-bootstrap";

const parts = [
  Parts.Part02,
  Parts.Part03,
  Parts.Part04,
  Parts.Part05,
  Parts.Part06,
  Parts.Part07,
  Parts.Part08,
  Parts.Part09,
  Parts.Part10,
  Parts.Part11,
  Parts.Part12
];

export default function App() {
  return (
    <div>
      <Tabs defaultActiveKey="part-02" id="uncontrolled-tab-example">
        {parts.map((p, i) => (
          <Tab eventKey={`part-${i + 2}`} title={`Part ${i + 2}`}>
            <div style={{ margin: "1rem" }}>{p()}</div>
            <div style={{ width: "90%", margin: "auto" }}>
              <h6 style={{ marginTop: "2rem" }}>Code:</h6>
              <textarea
                readOnly={true}
                style={{
                  width: "100%",
                  height: "50vh",
                  fontFamily: "monospace"
                }}
                value={p.toString()}
              />
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
