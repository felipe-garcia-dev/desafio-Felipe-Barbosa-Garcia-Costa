class CaixaDaLanchonete {
    // codigo = ['cafe', 'chantily', 'suco', 'sanduiche', 'queijo', 'salgado', 'combo1', 'combo2'];

    // Item extra seja informado sem o item principal

    // Combos não são considerados como item principal

    // Pode ser adicionado quantos itens extras se existir somente um principal

    // combos = ['combo1', 'combo2'];

    itemExtra = ['chantily', 'queijo'];

    itemPrincipal = ['cafe', 'suco', 'sanduiche', 'salgado'];


    valores = {
        cafe: 300,
        chantily: 150, //extra
        suco: 620,
        sanduiche: 650,
        queijo: 200, //extra
        salgado: 725,
        combo1: 950, //suco + sanduiche
        combo2: 750 //cafe + sanduiche
    }


    calcularValorDaCompra(metodoDePagamento, itens) {
        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let valorTotal = 0;
        let temExtra = false;
        let temPrincipal = false;


        for (const item of itens) {
            let [nome, valor] = item.split(',');
            valor = Number(valor);
            if (this.valores[nome]) { //Calculando o valor da conta em centavos
                valorTotal += this.valores[nome] * valor;
            }

            if (this.itemExtra.includes(nome)) {
                temExtra = true;
            }

            if (this.itemPrincipal.includes(nome)) {
                temPrincipal = true;
            }

            if (temExtra && !temPrincipal) {
                return 'Item extra não pode ser pedido sem o principal';
            }

            if (metodoDePagamento === 'dinheiro' && valor === 0) { //Quantidade inválida
                return 'Quantidade inválida!';
            }

            if (metodoDePagamento === 'credito' && !isNaN(nome) && isNaN(valor)) { //Item inválido
                return 'Item inválido!';
            }

            if (metodoDePagamento === 'debito' && !this.valores[nome]) {
                return 'Item inválido!';
            }


        }

        if (metodoDePagamento === 'dinheiro') {
            valorTotal = ((valorTotal * 0.95) / 100);
        } else if (metodoDePagamento === 'credito') {
            valorTotal = ((valorTotal * 1.03) / 100);
        } else if (metodoDePagamento === 'debito') {
            valorTotal = valorTotal / 100;
        } else if (metodoDePagamento !== 'dinheiro' || metodoDePagamento !== 'debito' || metodoDePagamento !== 'credito') {
            return 'Forma de pagamento inválida!'
        }
        return 'R$ ' + valorTotal.toFixed(2).replace('.', ',');

    }
}


let resultadoTotal = new CaixaDaLanchonete().calcularValorDaCompra('debito', ['cafe, 1', 'sanduiche, 2']);
console.log(resultadoTotal);
export { CaixaDaLanchonete };
