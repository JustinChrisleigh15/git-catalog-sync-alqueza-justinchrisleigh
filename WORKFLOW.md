\# WORKFLOW.md



\## Task 1 — Clone A: grace period committed and pushed

!\[Task 1](screenshots/task1.png)



\## Task 2 — Clone B: conflicting change pushed, rejected

!\[Task 2](screenshots/task2.png)



\## Task 3 — Clone B: merge conflict resolved

!\[Task 3](screenshots/task3.png)



\## Task 4 — Clone C: third contributor's change pushed, rejected

!\[Task 4](screenshots/task4.png)



\## Task 5 — Clone C: three-way merge conflict resolved

!\[Task 5](screenshots/task5.png)



\## Task 6 — Clone A: rebase conflict resolved

!\[Task 6 - Rejected Push](screenshots/task6-rejected.png)

!\[Task 6 - Conflict Resolution](screenshots/task6-conflict.png)



\## Task 7 — Merged into main, tagged v1.0-synced

!\[Task 7](screenshots/task7.png)



\## Questions



\### 1. Walk through the final calculateLateFee function and name which contributor's change is responsible for each part.



```js

function calculateLateFee(daysLate, ratePerDay) {

&#x20; if (daysLate <= 1) {

&#x20;   return 0;

&#x20; }

&#x20; const fee = Math.round(daysLate \* ratePerDay);

&#x20; if (fee > 20) {

&#x20;   return 20;

&#x20; }

&#x20; return fee < 1 ? 1 : fee;

}

```



The `if (daysLate <= 1) return 0;` part is from Task 1 (Clone A) — that's the grace period, so if a book is only 0 or 1 day late, no fee gets charged at all.



The `Math.round(daysLate \* ratePerDay)` line is from Task 2 (Clone B). Originally the base code used `Math.floor`, which just chops off the decimal, but Clone B changed it to round to the nearest whole number instead, so the fee is a little more "fair" depending on the exact amount.



The `if (fee > 20) return 20;` part is from Task 4 (Clone C) — that's the max fee cap so no one ever gets charged more than $20 no matter how late the book is.



Lastly, `return fee < 1 ? 1 : fee;` is from Task 6 (Clone A again) — the $1 minimum fee, so even if the calculated fee comes out to less than a dollar, it still charges at least $1.



Basically every single line in that function came from a different contributor, and the whole point of this lab was making sure none of those four changes got lost when everyone pushed on top of each other.



\### 2. Compare Task 3's two-way conflict to Task 5's three-way conflict — what got harder with a third line of work?



In Task 3 it was pretty straightforward — I only had to compare two versions of the function (mine with rounding vs. Clone A's with the grace period) and just mash them together since they didn't really overlap in logic.



Task 5 looked like a normal two-sided conflict too (git still just shows a HEAD side and the other side), but that's kind of the tricky part — one of those "sides" wasn't just one person's work anymore, it was already the merged result of two people (grace period + rounding) from Task 3. So when I was resolving it, I had to be way more careful, because if I messed up and picked the wrong side or deleted something without noticing, I could've silently thrown out someone else's change without even getting a conflict warning about it. It's not that the merge itself was more complicated to type out, it's that there was more at stake in getting it right since more people's work was riding on that one resolution.



\### 3. What's the actual difference between how you resolved Task 5 (merge) and Task 6 (rebase)?



For Task 5 I used `git merge`, which took my branch and the incoming changes and combined them into a brand new "merge commit" that has two parents — you can literally see it in the commit graph as two lines joining back together. My original commit history stays exactly as it happened, messy branching and all.



For Task 6 I used `git rebase` instead, which did something different — it basically took my commit (the $1 minimum fee) and replayed it on top of the latest version of the branch, like pretending I made that change after everyone else's work was already there instead of at the same time. That gave a cleaner, straight-line history with no merge commit at all. The end result code was the same either way, but the commit graph looks totally different — rebase rewrites history to look linear, merge just stitches the branches together as-is.



\### 4. If this were a real team of three, what one process change would have prevented all three rejected pushes?



Honestly the simplest fix would just be everyone agreeing to `git pull` (or at least `git fetch`) right before starting any new work, instead of just diving in on whatever version they happened to have locally. All three rejections happened because someone was working off a version of the branch that was already outdated by the time they tried to push. If we'd made it a rule to always sync up first, we probably would've caught the conflicts earlier (or avoided some of them) instead of finding out the hard way at push time.

