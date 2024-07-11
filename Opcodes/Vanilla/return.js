module.exports = {
    Return: {
        Validator: "local A=Inst[OP_A];local Limit=A+Inst[OP_B]-2;local Output={};local Edx=0;for Idx=A,Limit do Edx=Edx+1;Output[Edx]=Stk[Idx];end; do return Unpack(Output,1,Edx) end;",
        Mutate: (Instruction) => Instruction.Opcode = 30
    },
    ReturnB0: {
        Validator: "local A=Inst[OP_A];local Limit=Top;local Output={};local Edx=0;for Idx=A,Limit do Edx=Edx+1;Output[Edx]=Stk[Idx];end;do return Unpack(Output,1,Edx) end;",
        Mutate: (Instruction) => Instruction.Opcode = 30
    },
    ReturnB1: {
        Validator: "do return end",
        Mutate: (Instruction) => Instruction.Opcode = 30
    }
}