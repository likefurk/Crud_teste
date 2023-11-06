import { db } from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM empresas";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addUser =(req, res) => {
    const q = "INSERT INTO empresas(`name`, `email`, `phone`, `company`, `cnpj`, `address`, `number_address`, `password`, `cep`) VALUE(?)";

    const values = [
        req.body.name,
        req.body.company,
        req.body.cnpj,
        req.body.email,
        req.body.phone,
        req.body.cep,
        req.body.address,
        req.body.number_address,
        req.body.password,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário criado com sucesso")
    });
};

export const updateUser = (req, res) => {
    const q = "UPDATE empresas SET `name` = ?,` email` = ?, `phone` = ?, `email` = ?, `company` = ?, `cnpj` = ?, `address` = ?, `number_address` = ?, `password` = ?, `cep` = ? where `id` = ?";

    const values = [
        req.body.name,
        req.body.comapany,
        req.body.cnpj,
        req.body.email,
        req.body.phone,
        req.body.cep,
        req.body.address,
        req.body.number_address,
        req.body.password,
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário atualizado com sucesso.")
    });
};

export const deleteUser = (req, res) => {
    const q = "DELETE FROM empresas WHERE `id` = ?";


    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário deletado com sucesso.")
    });
};