import React, { useState, useEffect } from "react";
import '../Componentes/Navegacion.css';

export function Navegacion({ totalPages, onPageChange }) {
        const [currentPage, setCurrentPage] = useState(1);

        useEffect(() => {
            // Apply styling to the current page
            const buttons = document.querySelectorAll(".botones-navegacion button");
            buttons.forEach((button, index) => {
                if (index + 1 === currentPage) {
                    button.classList.add("current-page");
                } else {
                    button.classList.remove("current-page");
                }
            });
        }, [currentPage]);

        return (
            <div className="botones-navegacion">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={index + 1 === currentPage ? 'current-page' : ''}
                        onClick={() => {
                            setCurrentPage(index + 1);
                            onPageChange(index + 1);
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        );
    };
