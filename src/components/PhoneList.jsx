import './phonelist.css'
import { MdDelete } from "react-icons/md";
export const PhoneList = ({listPhone, deleteBtn}) => (
    <ul>
        <h1>Contacts</h1>
        {listPhone.map((contact) => (
         <li key={contact.id}>
            <p>{contact.name}</p>
            <p>{contact.number}</p>
            <button onClick={(e) => {e.preventDefault(); deleteBtn(contact.id) }} className="btnDelete">Delete <MdDelete /></button>
            </li>
        ))}
    </ul>
)