import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 5px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20x;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 20px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;


const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const user = ref.current;

            user.name = onEdit.name;
            user.email = onEdit.email;
            user.phone = onEdit.phone;
            user.company = onEdit.company;
            user.cnpj = onEdit.cnpj;
            user.address = onEdit.address;
            user.number_address = onEdit.number_address;
            user.password = onEdit.password;
            user.cep = onEdit.cep;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if (!user.name ||
        !user.email ||
        !user.phone ||
        !user.company ||
        !user.cnpj ||
        !user.address ||
        !user.number_address ||
        !user.password ||
        !user.cep) {
            return toast.warn("preencha todos os campos!")
        }

        if (onEdit) {
            await axios
            .put("http://localhost:5033/" + onEdit.id, {
                name: user.name,
                email: user.email,
                phone:user.phone,
                company:user.company, 
                cnpj:user.cnpj, 
                address:user.address, 
                number_address:user.number_address, 
                password:user.password,
                cep:user.cep,
            })
            .then(({data}) => toast.success(data))
            .catch(({data}) => toast.error(data));
        } else {
            await axios
                .post("http://localhost:5033", {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    company: user.company,
                    cnpj: user.cnpj,
                    address: user.address,
                    number_address: user.number_address,
                    password: user.password,
                    cep: user.cep,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }

                    user.name = "";
                    user.email = "";
                    user.phone = "";
                    user.company = "";
                    user.cnpj = "";
                    user.address = "";
                    user.number_address = "";
                    user.password = "";
                    user.cep = "";

        setOnEdit(null);
        getUsers();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit} >
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome" />
            </InputArea>
            <InputArea>
                <Label>Razão Social</Label>
                <Input name="company" />
            </InputArea>
            <InputArea>
                <Label>CNPJ</Label>
                <Input name="cnpj" />
            </InputArea>
            <InputArea>
                <Label>Senha</Label>
                <Input name="password" />
            </InputArea>
            <InputArea>
                <Label>CEP</Label>
                <Input name="cep" />
            </InputArea>
            <InputArea>
                <Label>Endereço</Label>
                <Input name="address" />
            </InputArea>
            <InputArea>
                <Label>N°</Label>
                <Input name="number_adress" />
            </InputArea>
            <InputArea>
                <Label>Telefone</Label>
                <Input name="phone" />
            </InputArea>
            <InputArea>
                <Label>Email</Label>
                <Input name="email" type="email" />
            </InputArea>

            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
}; 

export default Form