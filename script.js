document.addEventListener("DOMContentLoaded", function () {
    // Пример ответа API
    const apiResponse = {
        "services": [
            { "id": 1, "head": null, "name": "Проф.осмотр", "node": 0, "price": 100.0, "sorthead": 20 },
            { "id": 2, "head": null, "name": "Хирургия", "node": 1, "price": 0.0, "sorthead": 10 },
            { "id": 3, "head": 2, "name": "Удаление зубов", "node": 1, "price": 0.0, "sorthead": 10 },
            { "id": 4, "head": 3, "name": "Удаление зуба", "node": 0, "price": 800.0, "sorthead": 10 },
            { "id": 5, "head": 3, "name": "Удаление 8ого зуба", "node": 0, "price": 1000.0, "sorthead": 30 },
            { "id": 6, "head": 3, "name": "Удаление осколка зуба", "node": 0, "price": 2000.0, "sorthead": 20 },
            { "id": 7, "head": 2, "name": "Хирургические вмешательство", "node": 0, "price": 200.0, "sorthead": 10 },
            { "id": 8, "head": 2, "name": "Имплантация зубов", "node": 1, "price": 0.0, "sorthead": 20 },
            { "id": 9, "head": 8, "name": "Коронка", "node": 0, "price": 3000.0, "sorthead": 10 },
            { "id": 10, "head": 8, "name": "Слепок челюсти", "node": 0, "price": 500.0, "sorthead": 20 }
        ]
    }

    // Построение дерева
    function buildTree(data) {
        const treeContainer = document.getElementById("tree-container")

        // Группировка по head
        const groupedData = data.reduce((acc, node) => {
            const head = node.head || "root"
            acc[head] = acc[head] || []
            acc[head].push(node)
            return acc
        }, {})

        function buildLevel(parentId, levelData) {
            const ul = document.createElement("ul")

            levelData.sort((a, b) => a.sorthead - b.sorthead)

            levelData.forEach(node => {
                const li = document.createElement("li")
                li.textContent = `${node.name} (${node.price})`
                li.classList.add("node")

                if (node.node) {
                    const childUi = buildLevel(node.id, groupedData[node.id] || [])
                    li.appendChild(childUi)
                }

                ul.appendChild(li)
            })

            return ul
        }

        const rootUi = buildLevel("root", groupedData.root || [])
        treeContainer.appendChild(rootUi)
    }

    buildTree(apiResponse.services)
})