import { useArray } from "@/hooks";
import React from "react";

interface Person {
  id: number;
  name: string;
  age: number;
}

let id = 1;

export default () => {
  const p = [
    {
      id: 1,
      name: "jame",
      age: 37,
    },
  ];

  const [persons, add, remove, clear] = useArray<Person>(p);

  return (
    <div>
      <button
        onClick={() =>
          add({
            id: ++id,
            name: "layne_" + id,
            age: id,
          })
        }
      >
        add
      </button>
      <button onClick={() => remove(persons.length - 1)}>pop</button>
      <button onClick={() => clear()}>clear</button>
      {persons.map((person) => (
        <div key={person.id}>
          <span>姓名：{person.name}</span>
          <span>年龄：{person.age}</span>
        </div>
      ))}
    </div>
  );
};
