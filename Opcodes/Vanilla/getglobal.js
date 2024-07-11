module.exports = {
    GetGlobal: {
        Validator: "Stk[Inst[OP_A]]=Env[Const[Inst[OP_B]]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 5;
            Instruction.B--;
        }
    }
}