import React,{useState} from "react";
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropzone from "react-dropzone-uploader";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import {Button,Modal} from 'react-bootstrap'

export default function Uploader() {


  const getUploadParams = () => {
    return { url: "https://httpbin.org/post" };
  };

  const handleChangeStatus = ({ meta }, status) => {
    // console.log(status, meta);
  };

  const handleSubmit = (files, allFiles) => {
    allFiles.forEach(f =>{
      const data = new FormData();
      data.append('image',f.file)
      axios.post('http://localhost:5000/single',data).then((data)=>{
        
          console.log(data.data)
          if(data.data === 'Covid'){
            alert('The Patient might be Affected from COVID-19 VIRUS')
          }else{
            alert('The Patient is not showing any viruss Of COVID-19')
          }
      })
      f.remove()
    });
   
  };

  return (
    <div>
        <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        inputContent={
        <div>
          <FontAwesomeIcon
            className="customIcon"
            style={{
              color: "rgb(243, 243, 243)",
              fontSize: "50px",
              margin: "40px 150px"
            }}
            icon={faCloudUploadAlt}
          />
          <p>Drag and Drop or Browses to Upload</p>
        </div>}
        className="dropZone"
        styles={{ dropzone: { minHeight: 300, maxHeight: 400 , marginTop:100 } }}
       />
    
    </div>
  );
}
