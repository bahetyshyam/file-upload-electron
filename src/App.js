import React, { useState } from "react";
import axios from "axios";
import { Button } from "antd";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const onFileChange = (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
  };

  const onFileUpload = async (e) => {
    setLoading(!loading);
    const data = new FormData();
    data.append("file", selectedFile, selectedFile.name);
    await axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/upload`, data)
      .then((response) => {
        // setResponseFromServer(data);
        console.log(response.data);
        setLoading(false);
        setMessage("File Upload Successful");
        setSelectedFile(null);
      })
      .catch((e) => {
        setMessage("An Error Occured");
        setLoading(false);
      });
  };
  return (
    <div className="app">
      <input
        onChange={onFileChange}
        style={{ display: "none" }}
        id="file"
        type="file"
        accept="*"
      />
      <label htmlFor="file" className="uploadbox">
        {selectedFile && (
          <Button
            type="primary"
            onClick={onFileUpload}
            loading={loading}
            style={{ marginBottom: 10 }}
          >
            Upload
          </Button>
        )}

        <span>{selectedFile ? selectedFile.name : "Upload Test Files"}</span>
      </label>
      {message ? <div className="message">{message}</div> : null}
    </div>
  );
}

export default App;
