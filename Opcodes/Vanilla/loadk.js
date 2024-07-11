module.exports = {
    LoadK: {
        Validator: "Stk[Inst[OP_A]]=Const[Inst[OP_B]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 1;
            Instruction.B--;
        }
    }
}