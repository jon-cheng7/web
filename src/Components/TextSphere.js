import React, { useEffect } from 'react';
import "./TextSphere.css";

import TagCloud from "TagCloud"

const TextSphere = () => {
    
    useEffect(() => {
        return () => {
            const container = ".tagcloud";
            const texts = [
                "MongoDB",
                "HTML",
                "CSS",
                "React",
                "JS",
                "TS",
                "Node",
                "Express",
                "C++",
                "Java",
                "SQL",
                "Git",
                "Python",
            ];
            const options = {
                radius: 350,
                maxSpeed: "fast",
                initSpeed: "fast",
                direction: 135,
                keep: true,
            };

            TagCloud(container, texts, options);
        }
    }, []);
    
    return (
    <>
        <div className="text-sphere">
            <span className="tagcloud"></span>
        </div>
    </>
    );
};

export default TextSphere;