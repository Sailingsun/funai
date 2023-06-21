import { Configuration, OpenAIApi } from 'openai';
import {useCallback, useEffect, useState} from "react";

import './App.css'

function App() {
    const configuration = new Configuration({apiKey: ''});
    delete configuration.baseOptions.headers['User-Agent'];
    const openai = new OpenAIApi(configuration);
    
    const [data, setData] = useState('');
    const [inputData, setInputData] = useState('');
    
    const onChange = useCallback(e => {
        setInputData(e.target.value);
    }, []);
    
    const onSubmit = useCallback(async () => {
        const chatCompletion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{role: 'user', content: inputData}]
        });
        
        setData(chatCompletion.data.choices[0].message.content);
    }, [inputData]);
    
    return (
        <>
            <input value={inputData} onChange={onChange} />
            <button onClick={onSubmit}>submit</button>
            <div>{data}</div>
        </>
    );
}

export default App
