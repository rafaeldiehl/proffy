import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';


function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const res = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        setTeachers(res.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        options={[
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Química', label: 'Química' },
                            { value: 'Física', label: 'Física' },
                            { value: 'Educação Física', label: 'Educação Física' },
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Português', label: 'Português' },
                            { value: 'Inglês', label: 'Inglês' },
                            { value: 'Espanhol', label: 'Espanhol' },
                            { value: 'História', label: 'História' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'Sociologia', label: 'Sociologia' },
                            { value: 'Filosofia', label: 'Filosofia' }
                        ]}
                    />
                    <Select
                        name="week_day"
                        label="Dia da Semana"
                        value={week_day}
                        onChange={e => setWeekDay(e.target.value)}
                        options={[
                            { value: '1', label: 'Domingo' },
                            { value: '2', label: 'Segunda-feira' },
                            { value: '3', label: 'Terça-feira' },
                            { value: '4', label: 'Quarta-feira' },
                            { value: '5', label: 'Quinta-feira' },
                            { value: '6', label: 'Sexta-feira' },
                            { value: '7', label: 'Sábado' },
                        ]}
                    />
                    <Input 
                        name="time"
                        label="Hora"
                        type="time"
                        value={time}
                        onChange={e => {
                            setTime(e.target.value);
                        }}
                    />

                    <button type="submit" onClick={searchTeachers}>Buscar</button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            />
                })}
            </main>
        </div>
    )
}

export default TeacherList;