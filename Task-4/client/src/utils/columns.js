import moment from "moment"

export const COLUMNS=[
    {
        Header:"Id",
        accessor:"id"
    },
    {
        Header:"Profile",
        accessor:"img",
        Cell:({value})=><img className="avatar" src={`data:image/svg+xml;base64,${value}` } alt=""/>
    },
    {
        Header:"Name",
        accessor:"name"
    },
    {
        Header:"E-mail",
        accessor:"email"
    },
    {
        Header:"Last Login Time",
        accessor:"last_login",
        Cell:({value})=>value?moment(new Date(value)).format("MMMM Do YYYY, h:mm:ss a"):""
    },
    {
        Header:"Registration Time",
        accessor:"registration_date",
        Cell:({value})=>moment(new Date(value)).format("MMMM Do YYYY, h:mm:ss a")
    },
    {
        Header:"Status",
        accessor:"status",
        Cell:({value})=>value==="Active"?<span  className="green">{value}</span>:<span className="red">{value}</span>
    },
]

