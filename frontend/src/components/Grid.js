import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";


const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 10px auto;

`;

export const Thead = styled.thead``;
export const Tbody = styled.tbody``;
export const Tr = styled.tr``;
export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

    @media (max-width: 760px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
`;

const Grid = ({ users, setUsers, setOnEdit }) => {

    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (id) => {
        await axios
            .delete("http://localhost:5033" + id)
            .then(({ data }) => {
                const newArray = users.filter((user) => user.id !== id);

                setUsers(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setOnEdit(null);
    };

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Razão Social</Th>
                    <Th>CNPJ</Th>
                    <Th>Email</Th>
                    <Th>Telefone</Th>
                    <Th>CEP</Th>
                    <Th>Endereço</Th>
                    <Th>N°</Th>
                    <Th>Senha</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.map((item, i) => (
                    <Tr key={i}>
                        <Td width= "30%">{item.name}</Td>
                        <Td width= "30%">{item.company}</Td>
                        <Td width= "20%">{item.cnpj}</Td>
                        <Td width= "20%">{item.email}</Td>
                        <Td width= "20%">{item.phone}</Td>
                        <Td width= "20%">{item.cep}</Td>
                        <Td width= "20%">{item.address}</Td>
                        <Td width= "20%">{item.number_address}</Td>
                        <Td width= "20%">{item.password}</Td>
                        <Td align-center="true" width="10%"><FaEdit onClick={() => handleEdit(item)} /></Td>
                        <Td align-center="true" width="10%"><FaTrash onClick={() => handleDelete(item.id)} /></Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;