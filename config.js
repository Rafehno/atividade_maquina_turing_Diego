let fita = []
let cabeca = 0
let estado = "q0"

const delay = 1000

function log(msg) {
    document.getElementById("log").textContent += msg + "\n"
}

function desenhar() {

    document.getElementById("estado").innerText = estado
    document.getElementById("tape").innerText = fita.join(" ")

    let pointer = "  ".repeat(cabeca) + "^"

    document.getElementById("pointer").innerText = pointer
}

function validarEntrada(str) {

    if (!/^[TNG]+$/.test(str)) return false

    let t = (str.match(/T/g) || []).length
    let n = (str.match(/N/g) || []).length
    let g = (str.match(/G/g) || []).length

    if (t < 1 || t > 5) return false

    return true
}

function iniciar() {

    let entrada = document.getElementById("entrada").value.trim().toUpperCase()

    document.getElementById("log").textContent = ""

    if (!validarEntrada(entrada)) {
        alert("Entrada inválida")
        return
    }

    fita = entrada.split("")
    cabeca = 0
    estado = "q0"

    executar()
}

async function executar() {

    while (true) {

        desenhar()
        log("Estado: " + estado + " | Símbolo: " + fita[cabeca])

        await new Promise(r => setTimeout(r, delay))

        let simbolo = fita[cabeca]

        switch (estado) {

            case "q0":

                if (simbolo === "X") {
                    cabeca++
                }

                else if (simbolo === "T") {
                    fita[cabeca] = "X"
                    estado = "q1"
                    cabeca++
                }

                else if (simbolo === "Y" || simbolo === "Z") {
                    estado = "q4"
                }

                else {
                    rejeitar()
                    return
                }

                break


            case "q1":

                if (simbolo === "T" || simbolo === "Y") {
                    cabeca++
                }

                else if (simbolo === "N") {
                    fita[cabeca] = "Y"
                    estado = "q2"
                    cabeca++
                }

                else {
                    rejeitar()
                    return
                }

                break


            case "q2":

                if (simbolo === "N" || simbolo === "Z") {
                    cabeca++
                }

                else if (simbolo === "G") {
                    fita[cabeca] = "Z"
                    estado = "q3"
                    cabeca--
                }

                else {
                    rejeitar()
                    return
                }

                break


            case "q3":

                if (cabeca === 0) {
                    estado = "q0"
                }
                else {
                    cabeca--
                }

                break


            case "q4":

                if (simbolo === "X" || simbolo === "Y" || simbolo === "Z") {
                    cabeca++

                    if (cabeca >= fita.length) {
                        aceitar()
                        return
                    }
                }
                else {
                    rejeitar()
                    return
                }

                break

        }

    }

}

function aceitar() {
    log("RESULTADO: ACEITO ✅")
}

function rejeitar() {
    log("RESULTADO: REJEITADO ❌")
}