/* 
With real backend, I would move this into separate package ("shared")
where it would serve as type contract between backend and frontend
using Yarn workspaces or Nx. Redundant in this case.
*/

export type TodoItem = {
    label: string;
    isDone: boolean;
    createdAt: number;
    id: number;
    finishedAt?: number;
};
