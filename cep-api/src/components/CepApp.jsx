import { useState } from 'react';

function CepApp(){

    const [inputValue, setInputValue] = useState('');
    const [toggle, setToggle] = useState(true);
    const [information, setInformation] = useState("");

    const handleToggle = () => {
        setToggle(!toggle);
      };

    async function findCep (input){
        try {
            const dados = await fetch(`https://viacep.com.br/ws/${input}/json`);
            const json = await dados.json();
            setInformation(json)
            handleToggle();
            }
        catch{
            console.log("err")
        }
    }

    const handleInputChange = (e) => {

        const newValue = e.target.value;
        const regex = /^[a-zA-Z0-9\s]*$/;
    
        if (regex.test(newValue) || newValue === '')
            {
                setInputValue(newValue)
            }
        }

    const handleButtonClick = () => {
        findCep(inputValue)
        console.log(inputValue);
        setInputValue('');
    };
    
    return(
    <div className='bg-slate-50 shadow-2xl pt-1 h-[21rem] w-[20rem] flex absolute justify-center rounded-xl'>
    <div className="mt-10 flex flex-col items-center gap-10">
        <div className="flex items-center justify-center">
            <div className="relative">
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
                />
                <label
                    for="username"
                    className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
                >Find the Cep</label
                >
            </div>
            <button className="bg-black h-6 w-14 text-white rounded ml-5" onClick={handleButtonClick}>Find</button>
        </div>
        <div className={toggle ? 'hidden' : 'block'}>
            <div className='w-[15rem] h-[13rem]flex flex-col mr-[3rem] rounded p-5 justify-center '>
                <p>Cep:         {information.cep}</p>
                <p>Bairro:      {information.bairro}</p>
                <p>Rua:         {information.logradouro}</p>
                <p>localidade:  {information.localidade}</p>
                <p>ddd:         {information.ddd}</p>
                <p>UF:          {information.uf}</p>
            </div>
        </div>
    </div>
    </div>
    )
}
export default CepApp;