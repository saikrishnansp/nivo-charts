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
    # Main company node
    nodes = [{"id": "Company", "group": 0}]
    
    # Add clients (15 instead of 7)
    clients = [f"Client-{i}" for i in range(1, 16)]
    for c in clients:
        nodes.append({"id": c, "group": 1})
    
    # Add suppliers for more richness
    suppliers = [f"Supplier-{i}" for i in range(1, 11)]
    for s in suppliers:
        nodes.append({"id": s, "group": 2})
    
    links = []
    
    # Company to Clients links
    for c in clients:
        weight = random.randint(1, 10)
        links.append({"source": "Company", "target": c, "value": weight})
    
    # Company to Suppliers links
    for s in suppliers:
        weight = random.randint(1, 8)
        links.append({"source": "Company", "target": s, "value": weight})
    
    # Some inter-client relationships
    for i, c1 in enumerate(clients[:8]):
        if random.random() > 0.5:
            c2 = clients[random.randint(0, len(clients)-1)]
            if c1 != c2:
                links.append({"source": c1, "target": c2, "value": random.randint(1, 5)})
    
    # Some supplier-client relationships
    for s in suppliers[:5]:
        for c in clients[:5]:
            if random.random() > 0.7:
                links.append({"source": s, "target": c, "value": random.randint(1, 3)})
    
    result = {"nodes": nodes, "links": links}
    print(f"[DATA_GEN] Network data generated")
    print(f"[DATA_GEN] Network nodes count: {len(nodes)} (Company + {len(clients)} Clients + {len(suppliers)} Suppliers)")
    print(f"[DATA_GEN] Network links count: {len(links)}")
    print(f"[DATA_GEN] Network structure: complex graph with multiple node types")
    print(f"[DATA_GEN] Sample nodes: {nodes[:3]}")
    print(f"[DATA_GEN] Sample links: {links[:3]}")
    return result

# Circle packing data generator
def generate_circle_packing() -> Dict[str, Any]:
    # nested structure: company -> clients -> invoices
    def client_node(name: str) -> Dict[str, Any]:
        invoices = [{"name": f"inv-{random.randint(1000,9999)}", "value": random.randint(1, 20), "children": []} for _ in range(random.randint(2,6))]
        return {"name": name, "children": invoices}
    children = [client_node(f"Client-{i}") for i in range(1, 8)]
    result = {"name": "Company", "children": children}
    print(f"[DATA_GEN] CirclePacking data generated")
    print(f"[DATA_GEN] CirclePacking root name: {result.get('name')}")
    print(f"[DATA_GEN] CirclePacking children count: {len(result.get('children', []))}")
    print(f"[DATA_GEN] CirclePacking structure: {type(result)}")
    if result.get('children'):
        print(f"[DATA_GEN] First child: {result['children'][0]}")
    return result

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
    result = {"keys": clients, "matrix": matrix}
    print(f"[DATA_GEN] Chord data generated with {len(clients)} clients")
    print(f"[DATA_GEN] Chord keys: {clients}")
    print(f"[DATA_GEN] Matrix dimensions: {len(matrix)}x{len(matrix[0]) if matrix else 0}")
    return result

# Voronoi points generator
def generate_voronoi() -> List[Dict[str, Any]]:
    """
    Generate Voronoi diagram points.
    Nivo Voronoi expects an array of points with x, y coordinates
    """
    points = []
    # Generate 50 points with coordinates in a reasonable range
    # The viewport is typically around 800x600 in the frontend
    for i in range(50):
        point = {
            "id": f"point-{i}",
            "x": random.uniform(50, 750),  # Leave margin from edges
            "y": random.uniform(50, 550),
        }
        points.append(point)
    
    print(f"[DATA_GEN] Voronoi data generated")
    print(f"[DATA_GEN] Voronoi points count: {len(points)}")
    print(f"[DATA_GEN] Voronoi sample points: {points[:3]}")
    print(f"[DATA_GEN] Voronoi point keys: {list(points[0].keys()) if points else 'empty'}")
    print(f"[DATA_GEN] Voronoi X range: 50-750, Y range: 50-550")
    return points

# dispatcher
def generate_chart(chart_name: str) -> Dict[str, Any]:
    print(f"[DATA_GEN DISPATCHER] Received chart request: {chart_name}")
    if chart_name == "network":
        print("[DATA_GEN DISPATCHER] Generating network chart")
        return generate_network_data()
    if chart_name == "circlepacking":
        print("[DATA_GEN DISPATCHER] Generating circlepacking chart")
        return generate_circle_packing()
    if chart_name == "areaBump":
        print("[DATA_GEN DISPATCHER] Generating areaBump chart")
        return generate_area_bump()
    if chart_name == "chord":
        print("[DATA_GEN DISPATCHER] Generating chord chart")
        result = generate_chord()
        print(f"[DATA_GEN DISPATCHER] Chord result type: {type(result)}")
        print(f"[DATA_GEN DISPATCHER] Chord result keys: {result.keys() if isinstance(result, dict) else 'Not a dict'}")
        print(f"[DATA_GEN DISPATCHER] Chord matrix shape: {len(result.get('matrix', []))}x{len(result.get('matrix', [[]])[0]) if result.get('matrix') else 'empty'}")
        print(f"[DATA_GEN DISPATCHER] Chord keys: {result.get('keys')}")
        return result
    if chart_name == "voronoi":
        print("[DATA_GEN DISPATCHER] Generating voronoi chart")
        return generate_voronoi()
    print(f"[DATA_GEN DISPATCHER] Unknown chart type: {chart_name}, returning empty dict")
    return {}
