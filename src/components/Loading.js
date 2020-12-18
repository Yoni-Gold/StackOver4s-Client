import React , { useState , useEffect } from 'react';

function Loading()
{
    const stages = [
        '...Loading...',
        '....Loading..', 
        '.....Loading.',
        '......Loading', 
        '.....Loading.', 
        '....Loading..', 
        '...Loading...',
        '..Loading....',
        '.Loading.....',
        'Loading......',
        '.Loading.....',
        '..Loading....',
    ]
    const [stage , setStage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setStage(prev => (prev + 1) % stages.length) , 100);
        return () => clearInterval(interval);
    } , []);

    return <h1>{stages[stage]}</h1>
}

export default Loading;