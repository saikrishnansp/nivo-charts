# generate fake data for each chart
# simple english comments only
import random
import time
from typing import Dict, List, Any

def now_ts() -> int:
    # return current unix timestamp in seconds
    return int(time.time())

# Network graph data generator
def generate_network_data() -> Dict[str, Any]:
    # create nodes and links to simulate company invoice relationships
    clients = [f"Client-{i}" for i in range(1, 8)]
    nodes = [{"id": "Company", "group": 0}]
    for c in clients:
        nodes.append({"id": c, "group": 1})
    links = []
    for c in clients:
        # random count of invoices / shipments link weight
        weight = random.randint(1, 10)
        links.append({"source": "Company", "target": c, "value": weight})
    return {"nodes": nodes, "links": links}

# Circle packing data generator
def generate_circle_packing() -> Dict[str, Any]:
    # nested structure: company -> clients -> invoices
    def client_node(name: str) -> Dict[str, Any]:
        invoices = [{"name": f"inv-{random.randint(1000,9999)}", "value": random.randint(1, 20)} for _ in range(random.randint(2,6))]
        return {"name": name, "children": invoices}
    children = [client_node(f"Client-{i}") for i in range(1, 8)]
    return {"name": "Company", "children": children}

# Area bump (time series per client)
def generate_area_bump() -> List[Dict[str, Any]]:
    # series per client with monthly or time buckets
    buckets = ["T-4", "T-3", "T-2", "T-1", "Now"]
    series = []
    for i in range(1, 7):
        values = [{"x": b, "y": random.randint(10, 200)} for b in buckets]
        series.append({"id": f"Client-{i}", "data": values})
    return series

# Chord matrix generator (flow between clients)
def generate_chord() -> Dict[str, Any]:
    clients = [f"Client-{i}" for i in range(1, 7)]
    matrix = []
    for i in range(len(clients)):
        row = []
        for j in range(len(clients)):
            if i == j:
                row.append(0)
            else:
                row.append(random.randint(0, 50))
        matrix.append(row)
    return {"labels": clients, "matrix": matrix}

# Voronoi points generator
def generate_voronoi() -> List[Dict[str, Any]]:
    points = []
    for i in range(20):
        points.append({
            "id": f"p{i}",
            "x": random.uniform(0, 800),
            "y": random.uniform(0, 600),
            "value": random.randint(1, 100)
        })
    return points

# dispatcher
def generate_chart(chart_name: str) -> Dict[str, Any]:
    if chart_name == "network":
        return generate_network_data()
    if chart_name == "circlepacking":
        return generate_circle_packing()
    if chart_name == "areaBump":
        return generate_area_bump()
    if chart_name == "chord":
        return generate_chord()
    if chart_name == "voronoi":
        return generate_voronoi()
    return {}
