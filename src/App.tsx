import { identity, padStart, partial, partialRight, upperCase } from "lodash";
import React, { useState } from "react";
import styled from "styled-components";

const LetterButton = styled.button`
  width: 90px;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 4px;
`;

const Container = styled.div`
  height: 100%;
  display: grid;
  place-items: center;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  align-content: flex-start;
`;

const Textarea = styled.textarea`
  font-size: 16px;
  text-align: right;
`;

const HexBox = styled.pre`
  margin-left: 8px;
  font-size: 16px;
  border: 1px solid black;
  padding: 2px;
  width: 600px;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

const toHex = (char: string) => char.charCodeAt(0).toString(16).toUpperCase();

function App() {
  const [input, setInput] = useState<string>("");
  const addLetter = (letter: string) => setInput(`${input}${letter}`);
  const [up, setUp] = useState<boolean>(false);
  const toCase: (x: string) => string = up ? upperCase : identity;
  const renderLetterButton = (letter: string) => (
    <LetterButton onClick={() => addLetter(letter)}>
      <code>0x{toHex(letter)}</code>
      <span style={{ fontSize: "2em" }}>{letter}</span>
    </LetterButton>
  );
  return (
    <Container>
      <div>
        <Top>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
          />
          <HexBox>
            <code>
              {input
                .split("")
                .map(toHex)
                .map((hex) => padStart(hex, 4, "0"))
                .join(" ")
                .replace(/\s000A\s/g, `\n`)}
            </code>
          </HexBox>
        </Top>
        <button onClick={() => setUp(!up)}>
          {up ? "Uppercase" : "Lowercase"}
        </button>
        <div>
          <div>{toCase("äüößđ").split("").map(renderLetterButton)}umlaut</div>
          <div>{toCase("aàáảãạ").split("").map(renderLetterButton)}</div>
          <div>{toCase("ăằắẳẵặ").split("").map(renderLetterButton)}breve</div>
          <div>
            {toCase("âầấẩẫậ").split("").map(renderLetterButton)}circumflex
          </div>
          <div>{toCase("eèéẻẽẹ").split("").map(renderLetterButton)}</div>
          <div>
            {toCase("êẹễểễệ").split("").map(renderLetterButton)}circumflex
          </div>
          <div>{toCase("iìíỉĩị").split("").map(renderLetterButton)}</div>
          <div>{toCase("oòóỏõọ").split("").map(renderLetterButton)}</div>
          <div>
            {toCase("ôồồổỗộ").split("").map(renderLetterButton)}circumflex
          </div>
          <div>{toCase("ơờớởỡợ").split("").map(renderLetterButton)}horn</div>
          <div>{toCase("uùúủũụ").split("").map(renderLetterButton)}</div>
          <div>{toCase("ưừứửữự").split("").map(renderLetterButton)}horn</div>
          <div>none, grave, acute, hook, tilde, dot</div>
        </div>
      </div>
    </Container>
  );
}

export default App;
