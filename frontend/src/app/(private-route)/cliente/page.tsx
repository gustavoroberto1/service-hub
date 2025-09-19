'use client'

import axios from "axios";
import { useState } from "react"

type Address = {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    estado: string;
    regiao: string;
    ddd: string;
}

export default function Clients() {
    const [address, setAddress] = useState({} as Address)

    async function handleSearch() {
        const response = await axios.get(`https://viacep.com.br/ws/${address.cep}/json`)
        console.log(response)
        const add = {
            logradouro: response.data.logradouro,
            complemento: response.data.complemento,
            bairro: response.data.bairro,
            localidade: response.data.localidade,
            uf: response.data.uf,
            estado: response.data.estado,
            regiao: response.data.regiao,
            ddd: response.data.ddd,
        } as Address
        setAddress(add)
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            cep <input type="text" value={address.cep} onChange={(e) => setAddress((prev) => ({ ...prev, cep: e.target.value }))} /><br />

            <button onClick={handleSearch}>BUSCAR</button>
            logradouro <input type="text" value={address.logradouro} />
            complemento <input type="text" value={address.complemento} />
            bairro <input type="text" value={address.bairro} />
            localidade <input type="text" value={address.localidade} />
            uf <input type="text" value={address.uf} />
            estado <input type="text" value={address.estado} />
            regiao <input type="text" value={address.regiao} />
            ddd <input type="text" value={address.ddd} />
        </div>
    )
}