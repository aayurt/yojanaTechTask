// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import { Table, Tag, Space, Button, Upload, Spin } from "antd";
// import { InboxOutlined } from "@ant-design/icons";
// import TableEmployee from "./TableEmployee";

// const Employee = () => {
//     const [importLoading, setImportLoading] = useState(false);
//     const [importResponse, setImportResponse] = useState({});
//     const [counter, setCounter] = useState(0);
//     let message = {};
//     const { Dragger } = Upload;
//     const propsContainer = document.getElementById("employee");
//     const empD = Object.assign({}, propsContainer.dataset);
//     const empDJSOn = empD.entityid;
//     const allData = JSON.parse(empDJSOn);
//     const columns = [
//         {
//             title: "Full Name",
//             dataIndex: "fullname",
//             key: "fullname",
//             sorter: true,
//             render: text => <a>{text}</a>
//         },
//         {
//             title: "Date of Birth",
//             dataIndex: "dob",
//             key: "dob",
//             sorter: true
//         },
//         {
//             title: "Gender",
//             dataIndex: "gender",
//             key: "gender",
//             sorter: true,
//             filters: [
//                 {
//                     text: "Male",
//                     value: "male"
//                 },
//                 {
//                     text: "Female",
//                     value: "female"
//                 }
//             ],
//             onFilter: (value, record) => record.gender.indexOf(value) === 0
//         },
//         {
//             title: "Salary",
//             dataIndex: "salary",
//             key: "salary",
//             sorter: (a, b) => a.amount - b.amount
//         },
//         {
//             title: "Designation",
//             key: "designation",
//             dataIndex: "designation",
//             sorter: true,
//             render: text => <a>{text}</a>
//         },
//         {
//             title: "Action",
//             key: "action",
//             render: (text, record) => (
//                 <Space size="middle">
//                     <a>Invite {record.name}</a>
//                     <a>Delete</a>
//                 </Space>
//             )
//         }
//     ];
//     const data = allData.map((ele, i) => {
//         return {
//             key: i,
//             fullname: ele.full_name,
//             dob: ele.date_of_birth,
//             gender: ele.gender,
//             salary: ele.salary,
//             designation: ele.designation
//         };
//     });

//     const enterLoading = () => {
//         setImportLoading(true);

//         setTimeout(() => {
//             setImportLoading(false);
//         }, 6000);
//     };
//     const setImpState = async val => {
//         await setImportLoading(val);
//     };
//     const handleChange = info => {
//         const { status } = info.file;
//         setImpState(true);
//         console.log("importLoading", importLoading);

//         if (status !== "uploading") {
//         }
//         if (status === "done") {
//             message.success = `${info.file.name} file uploaded successfully.`;
//             setImpState(false);
//             setImportResponse(status);
//             console.log("importR", info?.file?.response);
//             console.log("importR", importResponse);
//             console.log("importLoading", importLoading);
//         } else if (status === "error") {
//             message.error = `${info.file.name} file upload failed.`;
//         }
//     };
//     const uploadProps = {
//         name: "your_file",
//         multiple: false,
//         accept: ".xlsx,.csv,application/msexcel",
//         action: "http://127.0.0.1:8000/api/employee",
//         onChange: handleChange
//     };
//     return (
//         <>
//             EMPLOYEE
//             <br />
//             <Dragger {...uploadProps}>
//                 <p className="ant-upload-drag-icon">
//                     <InboxOutlined />
//                 </p>
//                 <p className="ant-upload-text">
//                     Click or drag file to this area to upload
//                 </p>
//                 <p className="ant-upload-hint">
//                     Support for a single or bulk upload. Strictly prohibit from
//                     uploading company data or other band files
//                 </p>
//             </Dragger>
//             {counter}
//             <button onClick={() => setCounter(counter + 1)}>ADD</button>
//             <Button
//                 onClick={() => {
//                     window.location.reload();
//                 }}
//             >
//                 REFRESH
//             </Button>
//             <Button
//                 onClick={() => {
//                     handleUpload();
//                 }}
//             >
//                 UPLOAD
//             </Button>
//             <br />
//             {importLoading && <Spin />}
//             {!importLoading && importResponse.length > 0 && <>IMPORTED</>}
//             {!importLoading &&
//                 importResponse.length > 0 &&
//                 importResponse?.message === "failure" && <>Failuer</>}
//             <TableEmployee columns={columns} data={data} />
//         </>
//     );
// };
// export default Employee;
// if (document.getElementById("employee")) {
//     ReactDOM.render(<Employee />, document.getElementById("employee"));
// }
